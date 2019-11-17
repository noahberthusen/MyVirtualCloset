using System.Collections.Generic;

namespace MyVirtualCloset.Core.Clothes
{
    public interface IClothingService
    {

        void addClothes(string path, string tags, string name, string user, byte[] image);
        List<ClothingItem> viewClothesIdByUser(string user);
        List<ClothingItem> searchTags(string tag);
        ClothingItem getClothingItem(string id);
        void deleatItem(string id);
    }
}
