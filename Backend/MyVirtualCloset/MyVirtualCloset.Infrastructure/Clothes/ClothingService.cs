using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MyVirtualCloset.Core.Clothes;
using MyVirtualCloset.Core.DB;

namespace MyVirtualCloset.Infrastructure.ProgramUser
{
     public class ClothingService : IClothingService
    {

        private readonly DataContext _context;

        public ClothingService(DataContext context)
        {
            this._context = context;
        }

        public void addClothes(string path, string tags, string name)
        {
            var c1 = new ClothingItem();

            Guid guid = Guid.NewGuid();
            c1.id = guid.ToString();
            c1.name = name;
            c1.tags = tags;
            c1.url = path;

            _context.ClothingItem.Add(c1);
            _context.SaveChanges();
        }

        public string viewClothes(string id)
        {
            var clothSelected = _context.ClothingItem.SingleOrDefault(x => x.id == id);

            return clothSelected.url;
        }
    }
}
