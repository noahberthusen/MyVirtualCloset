using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyVirtualCloset.Core.Outfits
{
    public interface IOutfitService
    {

        Outfit createOutfit(string user, Outfit outfit);
        void addItemToOutfit(string outfitId, string itemId);
        void removeItemFromOutfit(string outfitId, string itemId);
        List<List<Outfit>> viewOutfitsByUser(string user);
        List<List<Outfit>> viewPublicOutfitsByUser(string user);
        List<Outfit> viewOutfit(string outfitId);
        void deleteOutfit(string outfitId);
        Task<List<List<Outfit>>> viewFollowingOutfits(string user);
    }
}
