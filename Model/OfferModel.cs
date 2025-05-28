using System.ComponentModel.DataAnnotations;

namespace OfferSuite.Model{
    
    public class OfferModel{

        [Key]
        public int Id {get;set;}

        // Evaluation Status
        public string? Status {get;set;}
        public string? GeneratedOffer {get;set;}
        public string? ResponseOffer {get;set;}
        public string? OfferCreated {get;set;}
        public string? BussinessName {get;set;}
        public string? DatetimeYear {get;set;}
        public string? DatetimeMonth {get;set;}
        public string? DatetimeGen {get;set;}
        

        // Contact Information
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }

        // Vehicle Details
        public string? Make { get; set; }
        public string? Model { get; set; }
        public string? Year { get; set; }
        public string? Color { get; set; }
        public string? Mileage { get; set; }
        public string? Condition { get; set; }
        public string? VIN { get; set; }
        public string? RegistrationNumber {get;set;}

        // Technical Details
        public string? Transmission { get; set; }
        public string? FuelType { get; set; }
        public string? Drivetrain { get; set; }

        // Vehicle History
        public string? Owners { get; set; }
        public string? ServiceHistory { get; set; }
        public string? LastInspection { get; set; }
        public string? NextInspection { get; set; }
        public string? AccidentHistory { get; set; }

        // Financial/Legal Info
        public string? Financed { get; set; }
        public string? RegistrationStatus { get; set; }
        public string? TaxBack { get; set; }
        public string? Packages { get; set; }
        public string? Towbar { get; set; }

        public List<string>? Photos { get; set; }

        // Additional Info
        public string? VehicleInfo { get; set; }

    }

}