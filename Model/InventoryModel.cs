namespace OfferSuite.Model
{
    public class InventoryModel
    {
        public int Id { get; set; }

        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int Year { get; set; }
        public decimal Price { get; set; }
        public int MileageMil { get; set; }
        public string FuelType { get; set; } = string.Empty;
        public string Transmission { get; set; } = string.Empty;
        public string BodyType { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> ImageUrls { get; set; } = new List<string>();
        public DateTime DateAdded { get; set; } = DateTime.UtcNow;
        public List<string> Features { get; set; } = new List<string>();

    }
}