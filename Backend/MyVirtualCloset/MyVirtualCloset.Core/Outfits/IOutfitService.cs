﻿using System;
using System.Collections.Generic;
using System.Text;

namespace MyVirtualCloset.Core.Outfits
{
    public interface IOutfitService
    {

        void createOutfit(string user, string name);
        void addItemToOutfit(string outfitId, string itemId);
        void removeItemFromOutfit(string outfitId, string itemId);
        List<List<Outfit>> viewOutfitsByUser(string user);
        List<Outfit> viewOutfit(string outfitId);

    }
}