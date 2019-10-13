using Microsoft.EntityFrameworkCore;
using MyVirtualCloset.Core.ProgramUser;
using MyVirtualCloset.Core.Clothes;

using MyVirtualCloset.Core.Outfits;
using System;
using System.Collections.Generic;
using System.Text;
using MyVirtualCloset.Core.Auth;

namespace MyVirtualCloset.Core.DB
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> User { get; set; }
        public DbSet<ClothingItem> ClothingItem { get; set;}
        public DbSet<ResetTickets> ResetTickets { get; set; }
        public DbSet<Outfit>  Outfit { get; set; }
    }
}
