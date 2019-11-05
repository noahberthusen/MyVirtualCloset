using System;
using System.Collections.Generic;
using System.Text;

namespace MyVirtualCloset.Core.ProgramUser
{
    public interface IUserService
    {
        User Create(User newUser);
        string GetUserById(string userId);
        // update and other functions
    }
}
