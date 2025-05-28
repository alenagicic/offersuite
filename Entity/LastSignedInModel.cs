using System.ComponentModel.DataAnnotations;

namespace OfferSuite.Entity{
    public class LastSignedIn{

        [Key]
        public int Id {get;set;}
        public string? DateTime {get;set;}
        public string? Username {get;set;}

    }
}