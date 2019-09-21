using Microsoft.EntityFrameworkCore;
using MyVirtualCloset.Core.ProgramUser;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyVirtualCloset.Core.DB
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> User { get; set; }
    }
}
