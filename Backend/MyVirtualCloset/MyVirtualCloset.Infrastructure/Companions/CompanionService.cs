using Microsoft.EntityFrameworkCore;
using MyVirtualCloset.Core.Companions;
using MyVirtualCloset.Core.DB;
using MyVirtualCloset.Core.ProgramUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyVirtualCloset.Infrastructure.Companions
{
    public class CompanionService : ICompanionService
    {
        private readonly DataContext _context;

        public CompanionService(DataContext context)
        {
            _context = context;
        }

        public void addCompanion(string user, string newFriend)
        {
            var existing = _context.Companion.SingleOrDefault(x => x.Follower == user && x.Following == newFriend);
            if (existing != null)
                throw new Exception("Already friends with this user");
            if (user == newFriend)
                throw new Exception("Cannot be friends with yourself");

            var c1 = new Companion();
            c1.Follower = user;
            c1.Following = newFriend;
            c1.PKey = user + newFriend;

            _context.Companion.Add(c1);

            var c2 = new Companion();
            c2.Follower = newFriend;
            c2.Following = user;
            c2.PKey = newFriend + user;

            _context.Companion.Add(c2);
            _context.SaveChanges();
        }

        public void addCompanionByUsername(string user, string friendUsername)
        {
            var friendUser = _context.User.SingleOrDefault(x => x.Username == friendUsername);
            if (friendUser == null)
                throw new Exception("User " + friendUsername + " does not exist");

            addCompanion(user, friendUser.Id);
        }

        public async Task<List<User>> getAllCompanions(string user)
        {
            List<User> companions = new List<User>();
            var companionIds = await _context.Companion.Where(x => x.Follower == user).ToListAsync();

            foreach (var i in companionIds)
            {
                var companionUser = await _context.User.SingleOrDefaultAsync(x => x.Id == i.Following);
                var strippedUser = new User();
                strippedUser.Id = companionUser.Id;
                strippedUser.Username = companionUser.Username;

                companions.Add(strippedUser);
            }

            return companions;
        }

        public void removeCompanion(string user, string oldFriend)
        {
            throw new NotImplementedException();
        }
    }
}
