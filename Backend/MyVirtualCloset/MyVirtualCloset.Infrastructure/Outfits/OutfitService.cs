using System;
using System.Collections.Generic;
using System.Linq;
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
            c1.PKey = c1.Id + c1.ItemID;
            c1.Private = existingOutfit.Private;

            _context.Outfit.Add(c1);
            _context.SaveChanges();
        }

        public Outfit createOutfit(string user, Outfit outfit)
        {
            var c1 = new Outfit();

            Guid guid = Guid.NewGuid();
            var id = guid.ToString();

            c1.Id = id;
            c1.ItemID = "Base";
            c1.Name = outfit.Name;
            c1.User = user;
            c1.Description = outfit.Description;
            c1.Tags = outfit.Tags;
            c1.Private = outfit.Private;
            c1.PKey = c1.Id + c1.ItemID;

            _context.Outfit.Add(c1);
            _context.SaveChanges();

            return c1;
        }

        public void deleteOutfit(string outfitId)
        {
            var clothSelected = _context.Outfit.Where(x => x.Id == outfitId);

            foreach (var i in clothSelected)
            {
                _context.Outfit.Remove(i);
            }
            _context.SaveChanges();
        }

        public void removeItemFromOutfit(string outfitId, string itemId)
        {
            var existingOutfit = _context.Outfit.SingleOrDefault(x => x.Id == outfitId && x.ItemID == itemId);
            _context.Outfit.Remove(existingOutfit);
        }

        public List<Outfit> viewOutfit(string outfitId)
        {
            var outfit = _context.Outfit.Where(x => x.Id == outfitId);
            return outfit.ToList<Outfit>();
        }

        public List<List<Outfit>> viewOutfitsByUser(string user)
        {
            var outfits = _context.Outfit.Where(x => x.User == user);
            var groups = outfits.GroupBy(x => x.Id);
        
            List<List<Outfit>> groupedUserOutfits = new List<List<Outfit>>();
            foreach (var group in groups)
            {
                groupedUserOutfits.Add(group.ToList());
            }
            return groupedUserOutfits;
        }

        public List<List<Outfit>> viewPublicOutfitsByUser(string user)
        {
            var outfits = _context.Outfit.Where(x => x.User == user && x.Private == 1);
            var groups = outfits.GroupBy(x => x.Id);

            List<List<Outfit>> groupedUserOutfits = new List<List<Outfit>>();
            foreach (var group in groups)
            {
                groupedUserOutfits.Add(group.ToList());
            }
            return groupedUserOutfits;
        }
    }
}
