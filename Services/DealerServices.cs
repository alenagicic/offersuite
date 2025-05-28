using Microsoft.EntityFrameworkCore;
using OfferSuite.Database;
using OfferSuite.Entity;
using OfferSuite.Factory;
using OfferSuite.Model;

namespace OfferSuite.Services{

    public class DealerServices{

        private readonly DatabaseContext _context;
        private readonly DealerFactory _factory;
        private readonly AccountFactory _factoryAcc;
        public DealerServices(DatabaseContext context, DealerFactory factory, AccountFactory factoryAcc){
            _context = context;
            _factory = factory;
            _factoryAcc = factoryAcc;
        }

        // Retrieve STATS

        public FiltrationResult GetFilteredData(FiltrationModel filter)
        {
            var query = _context.OfferEntities
            .Where(x => x.BussinessName!.ToLower() == filter.BussinessName!.ToLower())
            .AsQueryable();

            // Prepare the result here
            var result = new FiltrationResult();

            if (!string.IsNullOrEmpty(filter.Year)){
                query = query.Where(o => o.DatetimeYear == filter.Year);
                result.Year = filter.Year;
            }
            if (!string.IsNullOrEmpty(filter.Month)){
                query = query.Where(o => o.DatetimeMonth == filter.Month.ToLower());
                result.Month = filter.Month;
            }
            if (filter.Accepted == true)
            {
                query = query.Where(o => o.Status != null &&
                    (o.Status.ToLower().Trim() == "pursued" || o.Status.ToLower() == "pending"));
            }
            if (filter.Rejected == true)
            {
                query = query.Where(o => o.Status != null &&
                    o.Status.ToLower().Trim() == "dismissed");
            }

            if (filter.AmountRequest == true){
                result.AmountRequest = query.Count().ToString();
            }

            if (filter.AvgOffer == true)
            {
                var avg = query
                    .Select(x => x.GeneratedOffer)
                    .AsEnumerable()
                    .Select(x => decimal.TryParse(x, out var val) ? (decimal?)val : null)
                    .Where(x => x != null)
                    .Average();

                result.AvgOffer = avg.ToString();
            }

            if (filter.MaxOffer == true)
            {
                var max = query
                    .Where(o => o.GeneratedOffer != null)
                    .AsEnumerable()
                    .Select(o => Decimal.TryParse(o.GeneratedOffer, out var value) ? value : (decimal?)null)
                    .Where(v => v != null)
                    .Max();

                result.MaxOffer = max.ToString();
            }

            if (filter.LowOffer == true)
            {
                var min = query
                    .Where(o => o.GeneratedOffer != null)
                    .AsEnumerable()
                    .Select(o => Decimal.TryParse(o.GeneratedOffer, out var value) ? value : (decimal?)null)
                    .Where(v => v != null)
                    .Min();

                result.LowOffer = min.ToString();
            }

            if(filter.ResponseAvgOffer == true){

                    var avg = query
                    .Select(x => x.ResponseOffer)
                    .AsEnumerable()
                    .Select(x => decimal.TryParse(x, out var val) ? (decimal?)val : null)
                    .Where(x => x != null)
                    .Average();

                    result.ResponseAvgOffer = avg.ToString();
            }

            if(filter.ResponseMaxOffer == true){

                    var max = query
                    .Select(x => x.ResponseOffer)
                    .AsEnumerable()
                    .Select(x => decimal.TryParse(x, out var val) ? (decimal?)val : null)
                    .Where(x => x != null)
                    .Max();

                    result.ResponseMaxOffer = max.ToString();
            }

            if(filter.ResponseLowOFfer == true){

                    var low = query
                    .Select(x => x.ResponseOffer)
                    .AsEnumerable()
                    .Select(x => decimal.TryParse(x, out var val) ? (decimal?)val : null)
                    .Where(x => x != null)
                    .Min();

                    result.ResponseLowOFfer = low.ToString();
            }

            if (filter.PopCar == true)
            {
                result.PopCar = query
                    .GroupBy(o => o.Make)
                    .OrderByDescending(g => g.Count())
                    .Take(10)
                    .Select(g => new[] { g.Key, g.Count().ToString() })
                    .ToArray();
            }

            if (filter.Mileage == true)
            {
                var avgMileage = query
                    .Where(o => o.Mileage != null)
                    .AsEnumerable()
                    .Select(o => Decimal.TryParse(o.Mileage, out var value) ? value : (decimal?)null)
                    .Where(v => v != null)
                    .Average();
                result.AvgMileage = avgMileage.ToString();
            }

            if (filter.Rejected == true)
            {
                result.Rejected = query.Count().ToString();
            }

            if (filter.Accepted == true)
            {
                result.Accepted = query.Count().ToString();
            }

            return result;
        }

        // Retrieve REQUESTS

        public List<OfferModel> RetrieveIncoming(string email){

            var result = _context.OfferEntities
            .Where(x => x.BussinessName!.ToLower() == email.ToLower() && x.Status == "pending" || x.Status == "pursued")
            .ToList();

            List<OfferModel> list = new();

            foreach(var items in result){
                list.Add(_factory.CreateModelFromEntity(items));
            }

            return list;
        }

        public List<OfferModel> RetrieveHistory(string email){

            var result = _context.OfferEntities
            .Where(x => x.BussinessName!.ToLower() == email.ToLower() && x.Status == "dismissed").ToList(); 
            
            List<OfferModel> list = new();

            foreach(var items in result){
                list.Add(_factory.CreateModelFromEntity(items));
            }

            return list;
        }

        public AccountModel RetrieveAccountSettings(string email){

            var result = _context.AccountEntities
            .Where(x => x.Email!.ToLower() == email
            .ToLower()).FirstOrDefault();

            var resultMap = _factoryAcc.MapAccountEntityToModel(result!);

            return resultMap;
        }

        public List<PhonebookModel> RetrievePhonebook(string businessname){

            var ListOfPhonebook = new List<PhonebookModel>();

            var result = _context.OfferEntities
                        .Where(x => x.BussinessName == businessname)
                        .Select(x => new {
                            x.Name,
                            x.Email,
                            x.Phone
                        })
                        .ToList();

            foreach(var item in result){

                var model = new PhonebookModel
                {
                    Email = item.Email,
                    Name = item.Name,
                    Phonenumber = item.Phone
                };

                ListOfPhonebook.Add(model);

            }

            return ListOfPhonebook;
        }

        public List<PhonebookModel> RetrievePhonebookIncremental(string businessname, string value)
        {
            var listOfPhonebook = new List<PhonebookModel>();

            // Normalize value for case-insensitive comparison
            var loweredValue = value?.ToLower() ?? "";

            var result = _context.OfferEntities
                .Where(x => x.BussinessName == businessname &&
                        (x.Name!.ToLower().StartsWith(loweredValue) ||
                            x.Email!.ToLower().StartsWith(loweredValue) ||
                            x.Phone!.ToLower().StartsWith(loweredValue)))
                .Select(x => new {
                    x.Name,
                    x.Email,
                    x.Phone
                })
                .ToList();

            foreach (var item in result)
            {
                var model = new PhonebookModel
                {
                    Email = item.Email,
                    Name = item.Name,
                    Phonenumber = item.Phone
                };

                listOfPhonebook.Add(model);
            }

            return listOfPhonebook;
        }

        public DashboardModel RetrievePhonebookDashboard(){

            var result = new DashboardModel()
            {
                // Should grab info from the customer table that doesnt exist yet.
                // Should be populated when customer submits form && be able to be populated with CRUD!

                ActiveCustomers = new List<CustomerModel>()
                {
                    new CustomerModel{Active = true, CustomerData = "", DateTime = "2025-01-12", HighPrio = false, Name = "John Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = true, CustomerData = "", DateTime = "2025-01-12", HighPrio = false, Name = "Greta Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = true, CustomerData = "", DateTime = "2025-01-12", HighPrio = false, Name = "Walter Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = true, CustomerData = "", DateTime = "2025-01-12", HighPrio = false, Name = "Leonard Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = true, CustomerData = "", DateTime = "2025-01-12", HighPrio = false, Name = "Leonard Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = true, CustomerData = "", DateTime = "2025-01-12", HighPrio = false, Name = "Leonard Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = true, CustomerData = "", DateTime = "2025-01-12", HighPrio = false, Name = "Nana Doe", PhoneNumber = "0871909036"}
                },
                RecentCustomers = new List<CustomerModel>()
                {
                    new CustomerModel{Active = false, CustomerData = "", DateTime = "2025-01-12", HighPrio = false, Name = "John Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = false, CustomerData = "", DateTime = "2025-01-12", HighPrio = false, Name = "Greta Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = false, CustomerData = "", DateTime = "2025-01-12", HighPrio = false, Name = "Walter Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = false, CustomerData = "", DateTime = "2025-01-12", HighPrio = false, Name = "Leonard Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = false, CustomerData = "", DateTime = "2025-01-12", HighPrio = false, Name = "Nana Doe", PhoneNumber = "0871909036"}
                },
                HighPrioCustomers = new List<CustomerModel>()
                {
                    new CustomerModel{Active = false, CustomerData = "", DateTime = "2025-01-12", HighPrio = true, Name = "John Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = false, CustomerData = "", DateTime = "2025-01-12", HighPrio = true, Name = "Greta Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = false, CustomerData = "", DateTime = "2025-01-12", HighPrio = true, Name = "Walter Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = false, CustomerData = "", DateTime = "2025-01-12", HighPrio = true, Name = "Leonard Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = true, CustomerData = "", DateTime = "2025-01-12", HighPrio = false, Name = "Leonard Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = true, CustomerData = "", DateTime = "2025-01-12", HighPrio = false, Name = "Leonard Doe", PhoneNumber = "0871909036"},
                    new CustomerModel{Active = false, CustomerData = "", DateTime = "2025-01-12", HighPrio = true, Name = "Nana Doe", PhoneNumber = "0871909036"}
                },
                CustomerCount = "116",
                PartnerCount = "47",

            };

            return result;
        }

        // Submit REQUESTS

        public bool PutOffer(OfferModel model){
            
            var resultGet = _context.OfferEntities
            .Where(x => x.Id == model.Id).FirstOrDefault();

            resultGet!.Status = model.Status;

            if(model.ResponseOffer != "" && model.ResponseOffer != null){
                resultGet.ResponseOffer = model.ResponseOffer;
            }

            _context.OfferEntities.Update(resultGet);

            var resultSave = _context.SaveChanges();

            if(resultSave > 0){
                // additional logic for sending email (depending on offertype)
                return true;
            }

            return false;
        }

        public bool AddOffer(OfferModel model){
            
            _context.OfferEntities.Add(_factory.CreateEntityFromModel(model));

            var save = _context.SaveChanges();

            if(save > 0){
                return true;
            }

            return false;
        }

        public bool PostAccountSettings(AccountModel model){
            _context.AccountEntities.Add(_factoryAcc.MapAccountModelToEntity(model));

            var save = _context.SaveChanges();
            if(save > 0){
                return true;
            }

            return false;
        }

        public bool PutAccountSettings(AccountModel model)
        {
            var get = _context.AccountEntities.FirstOrDefault(x => x.Id == model.Id);

            if (get == null) return false;

            var mapresult = MapOnNotNullAccountEntity(model, get);

            _context.AccountEntities.Update(mapresult);

            var save = _context.SaveChanges();

            return save > 0;
        }

        public AccountEntity MapOnNotNullAccountEntity(AccountModel model, AccountEntity entity)
        {
            if (model.Email != null)
                entity.Email = model.Email;

            if (model.Password != null)
                entity.Password = model.Password;

            if (model.CompanyName != null)
                entity.CompanyName = model.CompanyName;

            if (model.OrganisationNumber != null)
                entity.OrganisationNumber = model.OrganisationNumber;

            if (model.Address != null)
                entity.Address = model.Address;

            if (model.AddressCo != null)
                entity.AddressCo = model.AddressCo;

            if (model.PhoneNumber != null)
                entity.PhoneNumber = model.PhoneNumber;

            if (model.PostalCode != null)
                entity.PostalCode = model.PostalCode;

            if (model.City != null)
                entity.City = model.City;

            if (model.County != null)
                entity.County = model.County;

            if (model.SubscriptionType != null)
                entity.SubscriptionType = model.SubscriptionType;

            if (model.PaymentMethod != null)
                entity.PaymentMethod = model.PaymentMethod;

            if (model.EmailResponseDecline != null)
                entity.EmailResponseDecline = model.EmailResponseDecline;

            if (model.EmailResponseApprove != null)
                entity.EmailResponseApprove = model.EmailResponseApprove;

            if (model.CreatedAt != null)
                entity.CreatedAt = model.CreatedAt;

            if (model.UpdatedAt != null)
                entity.UpdatedAt = model.UpdatedAt;


                return entity;
        }

    }

}