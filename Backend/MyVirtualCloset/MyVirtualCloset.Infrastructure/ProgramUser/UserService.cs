﻿using MyVirtualCloset.Core.DB;
using MyVirtualCloset.Core.ProgramUser;
using MyVirtualCloset.Infrastructure.Auth;
using System;
using System.Linq;

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
            var existingUser = _context.User.SingleOrDefault(x => x.Username == newUser.Username);

            if (existingUser != null)
                throw new Exception("Username '" + existingUser.Username + "' is already taken");

            if (newUser.Password == null || newUser.Username == null)
                throw new Exception("Username and password cannot be null");

            Guid guid = Guid.NewGuid();
            newUser.Id = guid.ToString();
            newUser.Salt = HashService.GetSalt();
            newUser.Hash = HashService.GetHash(newUser.Password, newUser.Salt);
            newUser.Password = null;

            _context.User.Add(newUser);
            _context.SaveChanges();

            return newUser;
        }

        public User GetUserById(string userId)
        {
            var user = _context.User.SingleOrDefault(x => x.Id == userId);
            if (user == null)
                throw new Exception("User " + userId + " does not exist");

            var user1 = new User();
            user1.Username = user.Username;
            user1.Id = user.Id;
            return user1;
        }
    }
}
