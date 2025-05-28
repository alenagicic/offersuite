namespace OfferSuite.Model{
    public class FiltrationModel{

        // Filtration values
        public string? Year {get;set;}
        public string? Month {get;set;}
        public string? BussinessName {get;set;}


        // Check to get statistics
        public bool? AmountRequest {get;set;}
        public bool? AvgOffer {get;set;}
        public bool? MaxOffer {get;set;}
        public bool? LowOffer {get;set;}
        public bool? ResponseAvgOffer {get;set;}
        public bool? ResponseMaxOffer {get;set;}
        public bool? ResponseLowOFfer {get;set;}
        public bool? PopCar {get;set;}
        public bool? Mileage {get;set;}

        // Below is for count accepted/rejected (same as amountrequests but more specific)
        public bool? Rejected {get;set;}
        public bool? Accepted {get;set;}

    }

}