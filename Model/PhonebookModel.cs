namespace OfferSuite.Model{
    public class PhonebookModel{

        public string? Id {get;set;}
        public string? Name {get;set;}
        public string? Email {get;set;}
        public string? Phonenumber {get;set;}
        public List<PhonebookModel>? ListModels {get;set;}

        // STATEVIEW BELOW
        public bool IsDefault {get;set;}
        public bool IsCompany {get;set;}
        public bool IsUser {get;set;}
        public bool IsSubmitForm {get;set;}
        public bool IsCampaign {get;set;}
        public bool IsActive {get;set;}

        // DASHBOARD DATA BELOW
        public DashboardModel? DashData {get;set;}

    }

}