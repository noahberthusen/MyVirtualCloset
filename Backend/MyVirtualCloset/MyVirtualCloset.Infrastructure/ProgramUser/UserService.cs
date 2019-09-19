using MyVirtualCloset.Core.DB;
using MyVirtualCloset.Core.ProgramUser;
using MyVirtualCloset.Infrastructure.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MyVirtualCloset.Infrastructure.ProgramUser
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;

        public UserService(DataContext context)
        {
            this._context = context;
        }

        public User Create(User newUser)
        {
            // do some validation on username and password
            //if (_context.User.Any(x => x.Username == newUser.Username))
            //    return null;

            newUser.Salt = HashService.GetSalt();
            Console.WriteLine(newUser.Salt);
            newUser.Hash = HashService.GetHash(newUser.Password, newUser.Salt);
            Console.WriteLine(newUser.Hash);
            newUser.Password = null;

            _context.User.Add(newUser);
            _context.SaveChanges();

            return newUser;
        }
    }
}
