using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyVirtualCloset.Api.AppSettings;
using MyVirtualCloset.Core.Auth;
using MyVirtualCloset.Core.ProgramUser;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyVirtualCloset.Infrastructure.Auth
{
    public class AuthService : IAuthService
    {
        private readonly AppSettings _appSettings;

        public AuthService(IOptions<AppSettings> appSettings)
        {
            this._appSettings = appSettings.Value;
        }

        public User Authenticate(string username, string password)
        {
            // find user in the db using password hashing
            User user = new User();
            user.Id = 1;
            user.FirstName = "Noah";
            user.LastName = "Berthusen";
            user.Username = "nfbert";
            user.Password = "password";
            user.Role = Role.Admin;

            if (user == null)
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
    }
}
