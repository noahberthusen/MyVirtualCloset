using System.Collections.Generic;

namespace MyVirtualCloset.Core.Outfits
{
    public interface IOutfitService
    {

        Outfit createOutfit(string user, string name);
        void addItemToOutfit(string outfitId, string itemId);
        void removeItemFromOutfit(string outfitId, string itemId);
        List<List<Outfit>> viewOutfitsByUser(string user);
        List<Outfit> viewOutfit(string outfitId);
        void deleteOutfit(string outfitId);

    }
}
