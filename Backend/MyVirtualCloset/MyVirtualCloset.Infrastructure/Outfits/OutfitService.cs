using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MyVirtualCloset.Core.DB;
using MyVirtualCloset.Core.Outfits;

namespace MyVirtualCloset.Infrastructure.Outfits
{
    public class OutfitService : IOutfitService
    {
        private readonly DataContext _context;

        public OutfitService(DataContext context)
        {
            this._context = context;
        }
        public void addItemToOutfit(string outfitId, string itemId)
        {
            var c1 = new Outfit();

            c1.Id = outfitId;
            c1.ItemID = itemId;

            var existingOutfit = _context.Outfit.SingleOrDefault(x => x.Id == c1.Id);

            c1.User = existingOutfit.User;
            c1.Name = existingOutfit.Name;

            _context.Outfit.Add(c1);
            _context.SaveChanges();
        }

        public void createOutfit(string user, string name)
        {
            var c1 = new Outfit();

            Guid guid = Guid.NewGuid();
            var id = guid.ToString();

            c1.Id = id;
            c1.ItemID = "Base";
            c1.Name = name;
            c1.User = user;

            _context.Outfit.Add(c1);
            _context.SaveChanges();
        }

        public void removeItemFromOutfit(string outfitId, string itemId)
        {
            var existingOutfit = _context.Outfit.SingleOrDefault(x => x.Id == itemId && x.ItemID == itemId);
            _context.Outfit.Remove(existingOutfit);
        }

        public Outfit viewOutfit(string outfitId)
        {
            throw new NotImplementedException();
        }

        public List<Outfit> viewOutfitsByUser(string user)
        {
            throw new NotImplementedException();
        }
    }
}
