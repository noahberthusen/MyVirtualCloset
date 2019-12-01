using MyVirtualCloset.Core.ProgramUser;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MyVirtualCloset.Core.Companions
{
    public interface ICompanionService
    {
        Task<List<User>> getAllCompanions(string user);
        void addCompanion(string user, string newFriend);
        void addCompanionByUsername(string user, string friendUsername);
        void removeCompanion(string user, string oldFriend);
    }
}
