using System;

namespace MyVirtualCloset.Core.ProgramUser
{
    public class User
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
        public byte[] Salt { get; set; }
        public byte[] Hash { get; set; }
    }
}
