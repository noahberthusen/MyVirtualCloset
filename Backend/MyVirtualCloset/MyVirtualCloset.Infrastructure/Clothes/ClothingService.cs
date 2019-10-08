using System.Collections.Generic;
using System.Linq;
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

        public void addClothes(string id, string tags, string name, string user)
        {
            var c1 = new ClothingItem();

            c1.id = id;
            c1.name = name;
            c1.tags = tags;
            c1.user = user;

            _context.ClothingItem.Add(c1);
            _context.SaveChanges();
        }

        public List<ClothingItem> viewClothesIdByUser(string user)
        {
            var clothSelected = _context.ClothingItem.Where(x => x.user == user);

            return clothSelected.ToList();
        }
    }
}
