namespace MyVirtualCloset.Core.Outfits
{
    public class Outfit
    {
        public string Id { get; set; }
        public string ItemID { get; set; }
        public string User { get; set; }
        public string Name { get; set; }
        public string PKey { get; set; }
        public string Description { get; set; }
        public string Tags { get; set; }
        public int Private { get; set; }
    }
}
