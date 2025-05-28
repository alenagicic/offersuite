using System.ComponentModel.DataAnnotations;

namespace OfferSuite.Model{


    public class SignInModel{

        [Required]
        public string? Username {get;set;}

        [Required]
        public string? Password {get;set;}

        public string? CheckPass {get;set;}

        public string? PsuedoName {get;set;}

        
    }




}