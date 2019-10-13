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
            throw new NotImplementedException();
        }

        public void createOutfit(string user, string name)
        {
            throw new NotImplementedException();
        }

        public void removeItemFromOutfit(string outfitId, string itemId)
        {
            throw new NotImplementedException();
        }

        public List<Outfit> viewOutfit(string outfitId)
        {
            var outfit = _context.Outfits.Where(x => x.Id == outfitId);
            return outfit.ToList<Outfit>();
        }

        public List<List<Outfit>> viewOutfitsByUser(string user)
        {
            var outfits = _context.Outfits.Where(x => x.User == user);
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
