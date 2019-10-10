using System;
using System.Collections.Generic;
using System.Text;
using MyVirtualCloset.Core.Outfits;

namespace MyVirtualCloset.Infrastructure.Outfits
{
    public class OutfitService : IOutfitService
    {
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
