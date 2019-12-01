using System;
using System.ComponentModel.DataAnnotations;

namespace MyVirtualCloset.Core.Companions
{
    public class Companion
    {
        public string Follower { get; set; }
        public string Following { get; set; }
        [Key]
        public string PKey { get; set; }
    }
}
