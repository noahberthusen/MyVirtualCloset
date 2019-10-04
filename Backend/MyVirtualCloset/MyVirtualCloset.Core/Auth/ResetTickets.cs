using System;

namespace MyVirtualCloset.Core.Auth
{
    public class ResetTickets
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public byte[] Salt { get; set; }
        public byte[] Hash { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
