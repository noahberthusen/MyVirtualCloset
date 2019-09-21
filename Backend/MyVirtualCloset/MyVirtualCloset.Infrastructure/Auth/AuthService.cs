using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyVirtualCloset.Core.AppSettings;
using MyVirtualCloset.Core.Auth;
using MyVirtualCloset.Core.DB;
using MyVirtualCloset.Core.ProgramUser;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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
    }
}
