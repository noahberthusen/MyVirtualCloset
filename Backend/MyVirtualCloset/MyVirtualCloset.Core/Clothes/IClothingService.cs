using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyVirtualCloset.Core.Clothes
{
    public interface IClothingService
    {

        void addClothes(string path, string tags, string name, string user, byte[] image);
        List<ClothingItem> viewClothesIdByUser(string user);
        Task<List<ClothingItem>> searchTags(string tag, string user);
        ClothingItem getClothingItem(string id);
        void deleteItem(string id);
    }
}
