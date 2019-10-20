﻿using System;
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
            c1.Key = c1.Id + c1.ItemID;

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
            c1.Key = c1.Id + c1.ItemID;

            _context.Outfit.Add(c1);
            _context.SaveChanges();
        }

        public void removeItemFromOutfit(string outfitId, string itemId)
        {
            var existingOutfit = _context.Outfit.SingleOrDefault(x => x.Id == itemId && x.ItemID == itemId);
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
    }
}