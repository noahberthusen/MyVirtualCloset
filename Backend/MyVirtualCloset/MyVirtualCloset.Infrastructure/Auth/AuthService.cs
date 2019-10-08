using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyVirtualCloset.Core.AppSettings;
using MyVirtualCloset.Core.Auth;
using MyVirtualCloset.Core.DB;
using MyVirtualCloset.Core.ProgramUser;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;

namespace MyVirtualCloset.Infrastructure.Auth
{
    public class AuthService : IAuthService
    {
        private readonly AppSettings _appSettings;
        private readonly DataContext _context;

        public AuthService(IOptions<AppSettings> appSettings,
            DataContext context)
        {
            this._appSettings = appSettings.Value;
            this._context = context;
        }

        public User Authenticate(string username, string password)
        {
            // find user in the db using username
            User user = _context.User.SingleOrDefault(x => x.Username == username);

            if (user == null)
                throw new Exception("Username or password is incorrect");

            if (!HashService.VerifyHash(password, user.Salt, user.Hash))
                throw new Exception("Username or password is incorrect");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddMinutes(20),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Password = null;

            return user;
        }

        public void ForgotPassword(string username)
        {
            User user = _context.User.SingleOrDefault(x => x.Username == username);
            ResetTickets oldTicket = _context.ResetTickets.SingleOrDefault(x => x.Username == username);

            if (user == null)
                throw new Exception("User not found");
            if (oldTicket != null)
                _context.Remove(oldTicket);

            string guid = Guid.NewGuid().ToString();
            byte[] salt = HashService.GetSalt();
            byte[] hash = HashService.GetHash(guid, salt);

            ResetTickets ticket = new ResetTickets();
            ticket.Id = user.Id;
            ticket.Username = user.Username;
            ticket.Salt = salt;
            ticket.Hash = hash;
            ticket.ExpirationDate = DateTime.Now.AddHours(1);

            _context.ResetTickets.Add(ticket);
            _context.SaveChanges();

            // send an email to the user with the link
            try
            {
                using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new System.Net.NetworkCredential("mail.myvirtualcloset@gmail.com", "myvirtualcloset");
                    smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtpClient.EnableSsl = true;

                    using (MailMessage mail = new MailMessage())
                    {
                        mail.From = new MailAddress("mail.myvirtualcloset@gmail.com", "MyVirtualCloset");
                        mail.To.Add(new MailAddress(user.Email));
                        mail.Subject = "Password reset request";

                        mail.IsBodyHtml = true;
                        Console.WriteLine(Directory.GetCurrentDirectory());

                        string body = message;
                        body = body.Replace("#UserUsername#", user.Username);
                        body = body.Replace("#PasswordLink#", "coms-309-ks-7.misc.iastate.edu/resetpassword?id=" + guid);
                        mail.Body = body;

                        smtpClient.Send(mail);
                    }
                }
            } catch (Exception e)
            {
                throw new Exception("Unable to send password reset email");
            }
        }

        public void ChangePassword(string username, string password, string token)
        {
            ResetTickets ticket = _context.ResetTickets.SingleOrDefault(x => x.Username == username);
            User user = _context.User.SingleOrDefault(x => x.Username == username);
           
            if (ticket == null)
                throw new Exception("User not found");
            if (!HashService.VerifyHash(token, ticket.Salt, ticket.Hash) ||
                ticket.ExpirationDate.CompareTo(DateTime.Now) < 0)
                throw new Exception("Invalid token. Please request a new token");

            user.Salt = HashService.GetSalt();
            user.Hash = HashService.GetHash(password, user.Salt);

            _context.ResetTickets.Remove(ticket);
            _context.SaveChanges();
        }

        private string message = "<table><tbody><tr><td>A password reset has been requested for the MyVirtualCloset username: #UserUsername#</td><br><br></tr><tr><td>If you did not make this request, you can safely ignore this email. A password reset request can be made by anyone, and it does not indicate that your account is in any danger of being accessed by someone else.</td><br><br></tr><tr><td>If you do actually want to reset your password, visit this link:</td><br><br></tr><tr><td>#PasswordLink#</td><br><br></tr><tr><td>MyVirtualCloset team</td></tr></tbody></table>";
    }
}
