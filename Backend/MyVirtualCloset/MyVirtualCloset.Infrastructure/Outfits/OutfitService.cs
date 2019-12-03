using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyVirtualCloset.Core.Companions;
using MyVirtualCloset.Core.DB;
using MyVirtualCloset.Core.Outfits;

namespace MyVirtualCloset.Infrastructure.Outfits
{
    public class OutfitService : IOutfitService
    {
        private readonly DataContext _context;
        private readonly ICompanionService _companionService;

        public OutfitService(DataContext context, ICompanionService companionService)
        {
            this._context = context;
            this._companionService = companionService;
        }

        public void addItemToOutfit(string outfitId, string itemId)
        {
            var c1 = new Outfit();

            c1.Id = outfitId;
            c1.ItemID = itemId;

            var existingOutfit = _context.Outfit.FirstOrDefault(x => x.Id == c1.Id);

            c1.User = existingOutfit.User;
            c1.Name = existingOutfit.Name;
            c1.Description = existingOutfit.Description;
            c1.Tags = existingOutfit.Tags;
            c1.PKey = c1.Id + c1.ItemID;
            c1.Private = existingOutfit.Private;
            c1.Date = existingOutfit.Date;

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
            c1.Date = DateTime.Now;

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
            var outfits = _context.Outfit.Where(x => x.User == user && x.Private == 0);
            var groups = outfits.GroupBy(x => x.Id);

            List<List<Outfit>> groupedUserOutfits = new List<List<Outfit>>();
            foreach (var group in groups)
            {
                groupedUserOutfits.Add(group.ToList());
            }
            return groupedUserOutfits;
        }

        private async Task<List<List<Outfit>>> viewPublicOutfitsByUserDate(string user)
        {
            var outfits = await _context.Outfit.Where(x => x.User == user && x.Private == 0 && x.Date >= DateTime.Today.AddDays(-7)).ToListAsync();
            var groups = outfits.GroupBy(x => x.Id);

            List<List<Outfit>> groupedUserOutfits = new List<List<Outfit>>();
            foreach (var group in groups)
            {
                groupedUserOutfits.Add(group.ToList());
            }
            return groupedUserOutfits;
        }

        public async Task<List<List<Outfit>>> viewFollowingOutfits(string user)
        {
            List<List<Outfit>> outfits = new List<List<Outfit>>();
            var friends = await _context.Companion.Where(x => x.Follower == user).ToListAsync();
            foreach (var friend in friends)
            {
                var friendOutfits = await viewPublicOutfitsByUserDate(friend.Following);
                foreach (var group in friendOutfits)
                {
                    outfits.Add(group);
                }
            }
            return outfits;
        }
    }
}
