namespace OfferSuite.Model{

    public class AccountModel{
        
        public int Id {get;set;}
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? CompanyName { get; set; }
        public string? OrganisationNumber { get; set; }
        public string? Address { get; set; }
        public string? AddressCo { get; set; }
        public string? PhoneNumber { get; set; }
        public string? PostalCode { get; set; }
        public string? City { get; set; }
        public string? County { get; set; }
        public string? SubscriptionType { get; set; }
        public string? PaymentMethod { get; set; }
        public string? EmailResponseDecline {get;set;}
        public string? EmailResponseApprove {get;set;}
        public string? CreatedAt { get; set; }
        public string? UpdatedAt { get; set; }

    }


}