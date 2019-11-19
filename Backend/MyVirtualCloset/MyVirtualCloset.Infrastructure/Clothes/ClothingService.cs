using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public void addClothes(string id, string tags, string name, string user, byte[] image)
        {
            var c1 = new ClothingItem();

            c1.id = id;
            c1.name = name;
            c1.tags = tags;
            c1.user = user;
            c1.image = image;

            _context.ClothingItem.Add(c1);
            _context.SaveChanges();

            var arr = tags.Split(';');

            foreach(var thing in arr)
            {
                var c2 = new tag();

                c2.name = thing;
                c2.item = id;
                c2.id = thing + id;

                _context.tag.Add(c2);
                _context.SaveChanges();
            }

            

        }

        public ClothingItem getClothingItem(string id)
        {
            var clothSelected = _context.ClothingItem.SingleOrDefault(x => x.id == id);
            return clothSelected;
        }

        public async Task<List<ClothingItem>> searchTags(string tag, string user)
        {
            var clothSelected = await _context.tag.Where(x => x.name == tag).ToListAsync();

            var re = new List<ClothingItem>();

            foreach (var i in clothSelected)
            {
                var foundItem = await _context.ClothingItem.SingleOrDefaultAsync(x => x.id == i.item && x.user == user);
                re.Add(foundItem);
            }

            return re;
           
        }

        public List<ClothingItem> viewClothesIdByUser(string user)
        {
            var clothSelected = _context.ClothingItem.Where(x => x.user == user);

            return clothSelected.ToList();
        }

        public void deleteItem(string id)
        {
            var clothSelected = _context.ClothingItem.SingleOrDefault(x => x.id == id);

            _context.ClothingItem.Remove(clothSelected);

            var tags = _context.tag.Where(x => x.item == id);


            foreach (var i in tags)
            {
                _context.tag.Remove(i);
            }

            _context.SaveChanges();
        }

    }
}
