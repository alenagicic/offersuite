namespace OfferSuite.Model{
    public class DashboardModel{

        public List<CustomerModel>? ActiveCustomers {get;set;}
        public List<CustomerModel>? HighPrioCustomers {get;set;}
        public string? CustomerCount {get;set;}
        public string? PartnerCount {get;set;}
        public List<CustomerModel>? RecentCustomers {get;set;}
    }
}