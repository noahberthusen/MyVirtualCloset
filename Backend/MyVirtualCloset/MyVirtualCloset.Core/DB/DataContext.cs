using Microsoft.EntityFrameworkCore;
using MyVirtualCloset.Core.ProgramUser;
using MyVirtualCloset.Core.Clothes;
using MyVirtualCloset.Core.Outfits;
using MyVirtualCloset.Core.Auth;
using MyVirtualCloset.Core.Companions;

namespace MyVirtualCloset.Core.DB
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> User { get; set; }
        public DbSet<ClothingItem> ClothingItem { get; set;}
        public DbSet<ResetTickets> ResetTickets { get; set; }
        public DbSet<Outfit>  Outfit { get; set; }
        public DbSet<tag> tag { get; set; }
        public DbSet<Companion> Companion { get; set; }
        public DbSet<likes> likes { get; set; }
    }
}
