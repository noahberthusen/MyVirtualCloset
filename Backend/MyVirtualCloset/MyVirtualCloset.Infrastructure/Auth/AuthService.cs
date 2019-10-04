using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyVirtualCloset.Core.AppSettings;
using MyVirtualCloset.Core.Auth;
using MyVirtualCloset.Core.DB;
using MyVirtualCloset.Core.ProgramUser;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
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
                return null;

            if (!HashService.VerifyHash(password, user.Salt, user.Hash))
                return null;

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

        public string ForgotPassword(string username)
        {
            //User user = _context.User.SingleOrDefault(x => x.Username == username);

            //if (user == null)
            //    return null;

            //string guid = Guid.NewGuid().ToString();
            //byte[] salt = HashService.GetSalt();
            //byte[] hash = HashService.GetHash(guid, salt);

            //ResetTickets ticket = new ResetTickets();
            //ticket.Id = user.Id;
            //ticket.Salt = salt;
            //ticket.Hash = hash;
            //ticket.ExpirationDate = DateTime.Now.AddHours(1);
            //ticket.TokenUsed = false;

            //_context.ResetTickets.Add(ticket);
            //_context.SaveChanges();

            // send an email to the user with the link
            using (SmtpClient smtpClient = new SmtpClient("coms-309-ks-7.misc.iastate.edu"))
            {
                smtpClient.Credentials = new System.Net.NetworkCredential("nfb1@coms-309-ks-7.misc.iastate.edu", "custom hammock drawl");
                smtpClient.UseDefaultCredentials = true;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.EnableSsl = true;

                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress("nfb1@coms-309-ks-7.misc.iastate.edu", "MyVirtualCloset");
                    mail.To.Add(new MailAddress("nfb1@iastate.edu"));
                    smtpClient.Send(mail);
                }
            }            


            return null;

        }
    }
}
