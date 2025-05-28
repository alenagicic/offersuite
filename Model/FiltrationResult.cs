namespace OfferSuite.Model{

    public class FiltrationResult{

        // Timespan for result
        public string? Year {get;set;}
        public string? Month {get;set;}

        // Type of data being returned
        public string? AmountRequest { get; set; }
        public string? AvgOffer { get; set; }
        public string? MaxOffer { get; set; }
        public string? LowOffer { get; set; }
        public string? ResponseAvgOffer {get;set;}
        public string? ResponseMaxOffer {get;set;}
        public string? ResponseLowOFfer {get;set;}
        public Array[]? PopCar { get; set; }
        public string? AvgMileage { get; set; }
        public string? Rejected { get; set; }
        public string? Accepted { get; set; }
    }    
}