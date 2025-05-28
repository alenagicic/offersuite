using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using OfferSuite.Filters;
using OfferSuite.Model;
using OfferSuite.Services;

namespace OfferSuite.Controllers{

    [LockControllerIfUserLoggedIn]
    [Route("dealership")]
    public class DealershipController : Controller 
    {
        private readonly DealerServices _services;

        public DealershipController(DealerServices services){
            _services = services;
        }

        public IActionResult Index(){

            return View("DealershipIndex");

        }

        [HttpGet("getone")]
        public IActionResult GetOne(){

            var email = HttpContext.Items["Username"] as string;

            var result = _services.RetrieveIncoming(email!);

            return Ok(result);
        }
        
        [HttpGet("home")]
        public IActionResult GetHome()
        {
            var email = HttpContext.Items["Username"] as string;

            var result = _services.RetrieveIncoming(email!);

            return Ok(result);
        }

        [HttpGet("history")]
        public IActionResult GetHistory()
        {
            var email = HttpContext.Items["Username"] as string;

            var result = _services.RetrieveHistory(email!);

            return Ok(result);
        }

        [HttpGet("clear-cookie")]
        public IActionResult ClearCookie()
        {
            Response.Cookies.Delete("AuthToken");

            return RedirectToAction("Index", "Home");

        }
    
        [HttpGet("retrieve-account-settings")]
        public IActionResult RetrieveAccountSettings(){

            var email = HttpContext.Items["Username"] as string;

            var result = _services.RetrieveAccountSettings(email!);

            if(result != null){
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPost("post-account-settings")]
        public IActionResult PostAccountSettings([FromForm] AccountModel model){

            var result = _services.PutAccountSettings(model);

            if(result){
                return RedirectToAction("Index");
            }

            return BadRequest();
        }
    
        [HttpPost("post-user")]
        public IActionResult PostNewUser([FromBody] CustomerFormModel model){
            return Ok();
        }

        [HttpPut("put-account-settings")]
        public IActionResult PutAccountSettings([FromBody] AccountModel model){
            
            var result = _services.PutAccountSettings(model);

            if(result){
                return Ok();
            }
            
            return BadRequest();
        }

        [HttpGet("retrieve-email-settings")]
        public IActionResult RetrieveEmailSettings(){

            var emailInfo = new[]
            {
                new[]
                {
                    "Svantes Bilpunkt: Vehicle Offer Decision",
                    """
                    Dear Harald Svenning,

                    Thank you for reaching out to us and for giving us the opportunity to evaluate your vehicle.

                    After a thorough review, we have decided not to proceed with an offer at this time. This decision is based on factors such as market demand, vehicle specifications, or condition, which may not align with our current purchasing criteria.

                    Please know that we truly appreciate your interest and the time you took to submit your request. We encourage you to stay in touch, as our acquisition needs may change in the future.

                    Kind regards,  
                    Svantes Bilpunkt
                    """
                },
                new[]
                {
                    "Svantes Bilpunkt: Vehicle Offer Approval",
                    """
                    Dear Harald Svenning,

                    Thank you for reaching out to us and for giving us the opportunity to evaluate your vehicle.

                    We are pleased to inform you that we would like to make an offer for your vehicle based on the details provided. Our evaluation indicates that your vehicle aligns well with our current acquisition criteria.

                    A representative from our team will be in contact shortly to discuss the next steps and provide you with more information regarding the offer and the process moving forward.

                    We appreciate your interest and look forward to assisting you further.

                    Kind regards,  
                    Svantes Bilpunkt
                    """
                }

            };

            return Ok(emailInfo);
        }

        [HttpPut("put-offer")]
        public IActionResult PutOffer([FromBody] OfferModel model){

            var offerModel = new OfferModel
            {
                Id = model.Id,
                Status = model.Status,
                ResponseOffer = model.ResponseOffer
            };

            var result = _services.PutOffer(offerModel);

            if(result){
                return Ok();
            }

            return BadRequest();
        }
    
        [HttpGet("getPartialData")]
        public IActionResult GetPartialData(string viewName)
        {
            var email = HttpContext.Items["Username"] as string;

            object data = null;

            if (viewName == "incoming")
            {
                var result = _services.RetrieveIncoming(email!);
                data = result; 
            }
            else if (viewName == "history")
            {
                var result = _services.RetrieveHistory(email!);
                data = result;
            }
            else if (viewName == "settings")
            {
                var result = _services.RetrieveAccountSettings(email!);
                data = result;
            }
            else if (viewName == "statistics")
            {
                var result = new List<FiltrationResult>();
                data = result;
            }
            else if (viewName == "phonebook" || viewName == "phonebookb" || viewName == "phonebookadd" || viewName == "phonebookcampaign" || viewName == "phonebookactive" || viewName == "phonebookuser")
            {
                // Data for all views below (except add) gets their data rendered via js!

                if (viewName == "phonebook")
                {
                    var result = _services.RetrievePhonebookDashboard();
                    var newresult = new PhonebookModel{ListModels = new List<PhonebookModel>(), DashData = result, IsDefault = true};
                    data = newresult;
                } else if (viewName == "phonebookb")
                {
                    var newresult = new PhonebookModel{ListModels = new List<PhonebookModel>(), IsCompany = true};
                    viewName = "phonebook";
                    data = newresult;
                } else if (viewName == "phonebookuser"){
                    var newresult = new PhonebookModel{ListModels = new List<PhonebookModel>(), IsUser = true};
                    viewName = "phonebook";
                    data = newresult;
                } else if (viewName == "phonebookadd")
                {
                    var newresult = new PhonebookModel{ListModels = new List<PhonebookModel>(), IsSubmitForm = true};
                    viewName = "phonebook";
                    data = newresult;
                } else if (viewName == "phonebookcampaign")
                {
                    var newresult = new PhonebookModel{ListModels = new List<PhonebookModel>(), IsCampaign = true};
                    viewName = "phonebook";
                    data = newresult;
                } else if (viewName == "phonebookactive")
                {
                    var newresult = new PhonebookModel{ListModels = new List<PhonebookModel>(), IsActive = true};
                    viewName = "phonebook";
                    data = newresult;
                }
            }
            else if (viewName == "carlisting"){
                var result = new List<InventoryModel>();
                data = result;
            }
            else
            {
                var result = GetStatisticsData();
                data = result;
            }

            return PartialView($"~/Views/Dealership/DealerPartials/_{viewName}.cshtml", data);
        }

        [HttpGet("incoming-requests-per-month/{year}")]
        public IActionResult GetIncomingRequestsPerMonth(string year)
        {
            var model = new FiltrationModel
            {
                Year = year,
                BussinessName = GetUsername(),
                AmountRequest = true,
                AvgOffer = true,
                PopCar = true
            };

            var result = GenerateMonthlyData(model);
            return PartialView("~/Views/Dealership/DealerPartials/_Statistics.cshtml", result);
        }

        [HttpGet("accepted-offers/{year}")]
        public IActionResult GetAcceptedOffers(string year)
        {
            var model = new FiltrationModel
            {
                Year = year,
                BussinessName = GetUsername(),
                Accepted = true,
                ResponseAvgOffer = true,
                PopCar = true
            };

            var result = GenerateMonthlyData(model);
            return PartialView("~/Views/Dealership/DealerPartials/_Statistics.cshtml", result);
        }

        [HttpGet("rejected-offers/{year}")]
        public IActionResult GetRejectedOffers(string year)
        {
            var model = new FiltrationModel
            {
                Year = year,
                BussinessName = GetUsername(),
                Rejected = true,
                AvgOffer = true,
                PopCar = true
            };

            var result = GenerateMonthlyData(model);
            return PartialView("~/Views/Dealership/DealerPartials/_Statistics.cshtml", result);
        }

        [HttpGet("requests-by-car-model/{year}")]
        public IActionResult GetRequestsByCarModel(string year)
        {
            var model = new FiltrationModel
            {
                Year = year,
                BussinessName = GetUsername(),
                AmountRequest = true,
                Mileage = true,
                PopCar = true
            };

            var result = new List<FiltrationResult> { _services.GetFilteredData(model) };
            return PartialView("~/Views/Dealership/DealerPartials/_Statistics.cshtml", result);
        }

        [HttpGet("average-offer-amount/{year}")]
        public IActionResult GetAverageOfferAmount(string year)
        {
            var model = new FiltrationModel
            {
                Year = year,
                BussinessName = GetUsername(),
                MaxOffer = true,
                AvgOffer = true,
                LowOffer = true
            };

            var result = GenerateMonthlyData(model);
            return PartialView("~/Views/Dealership/DealerPartials/_Statistics.cshtml", result);
        }

        [HttpGet("phonebookb/grabmore/{value}")]
        public IActionResult GrabMoreNumbersBusiness(string value)
        {
            var email = HttpContext.Items["Username"] as string;

            // Need functionality to hook up to business postal and retrieve info

            var result = _services.RetrievePhonebook(email!);

            var newresult = new PhonebookModel{ListModels = result, IsCompany = true};

            return Ok(newresult);
        }

        [HttpGet("phonebook/grabmore/{value}")]
        public IActionResult GrabMoreNumbersCustomer(string value)
        {
            var email = HttpContext.Items["Username"] as string;

            var result = _services.RetrievePhonebookIncremental(email!, value);

            var newresult = new PhonebookModel{ListModels = result};

            return Ok(newresult);
        }

        // HELPERS BELOW

        private List<FiltrationResult> GenerateMonthlyData(FiltrationModel baseModel)
        {
            var results = new List<FiltrationResult>();
            var culture = new CultureInfo("en-US");
            var monthNames = culture.DateTimeFormat.MonthNames.Where(m => !string.IsNullOrWhiteSpace(m)).ToArray();

            foreach (var month in monthNames)
            {
                baseModel.Month = month.ToLower();
                results.Add(_services.GetFilteredData(baseModel));
            }

            return results;
        }

        private string GetUsername()
        {
            return HttpContext.Items["Username"] as string ?? string.Empty;
        }

        private object GetStatisticsData()
        {
            var resultResponse = new List<FiltrationResult>();
            var model = new FiltrationModel
            {
                Year = "2025",  // Just as an example
                BussinessName = HttpContext.Items["Username"] as string,
                AmountRequest = true,
                AvgOffer = true,
                PopCar = true
            };

            var englishCulture = new CultureInfo("en-US");
            var monthNames = englishCulture.DateTimeFormat.MonthNames;

            for (var i = 0; i < 12; i++)
            {
                model.Month = monthNames[i].ToLower();
                resultResponse.Add(_services.GetFilteredData(model));
            }

            return resultResponse;
        }


    }
}

