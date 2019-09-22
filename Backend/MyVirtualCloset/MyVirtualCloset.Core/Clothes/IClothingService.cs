namespace MyVirtualCloset.Core.Clothes
{
    public interface IClothingService
    {

        void addClothes(string path, string tags, string name);
        string viewClothes(string id);
    }
}
