using OfferSuite.Entity;
using OfferSuite.Model;

namespace OfferSuite.Factory{


    public class DealerFactory{

        public OfferEntity CreateEntityFromModel(OfferModel model)
        {
            if (model == null)
            {
                return new OfferEntity();
            }

            return new OfferEntity
            {
                Id = model.Id,
                Status = model.Status,
                GeneratedOffer = model.GeneratedOffer,
                ResponseOffer = model.ResponseOffer,
                OfferCreated = model.OfferCreated,
                BussinessName = model.BussinessName,
                DatetimeGen = model.DatetimeGen,
                DatetimeMonth = model.DatetimeMonth,
                DatetimeYear = model.DatetimeYear,
                Name = model.Name,
                Email = model.Email,
                Phone = model.Phone,
                Make = model.Make,
                Model = model.Model,
                Year = model.Year,
                Color = model.Color,
                Mileage = model.Mileage,
                Condition = model.Condition,
                VIN = model.VIN,
                RegistrationNumber = model.RegistrationNumber,
                Transmission = model.Transmission,
                FuelType = model.FuelType,
                Drivetrain = model.Drivetrain,
                Owners = model.Owners,
                ServiceHistory = model.ServiceHistory,
                LastInspection = model.LastInspection,
                NextInspection = model.NextInspection,
                AccidentHistory = model.AccidentHistory,
                Financed = model.Financed,
                RegistrationStatus = model.RegistrationStatus,
                TaxBack = model.TaxBack,
                Packages = model.Packages,
                Towbar = model.Towbar,
                Photos = model.Photos,
                VehicleInfo = model.VehicleInfo
            };
        }

        public OfferModel CreateModelFromEntity(OfferEntity entity)
        {
            if (entity == null)
            {
                return new OfferModel();
            }

            return new OfferModel
            {
                Id = entity.Id,
                Status = entity.Status,
                GeneratedOffer = entity.GeneratedOffer,
                ResponseOffer = entity.ResponseOffer,
                OfferCreated = entity.OfferCreated,
                BussinessName = entity.BussinessName,
                DatetimeGen = entity.DatetimeGen,
                DatetimeMonth = entity.DatetimeMonth,
                DatetimeYear = entity.DatetimeYear,
                Name = entity.Name,
                Email = entity.Email,
                Phone = entity.Phone,
                Make = entity.Make,
                Model = entity.Model,
                Year = entity.Year,
                Color = entity.Color,
                Mileage = entity.Mileage,
                Condition = entity.Condition,
                VIN = entity.VIN,
                RegistrationNumber = entity.RegistrationNumber,
                Transmission = entity.Transmission,
                FuelType = entity.FuelType,
                Drivetrain = entity.Drivetrain,
                Owners = entity.Owners,
                ServiceHistory = entity.ServiceHistory,
                LastInspection = entity.LastInspection,
                NextInspection = entity.NextInspection,
                AccidentHistory = entity.AccidentHistory,
                Financed = entity.Financed,
                RegistrationStatus = entity.RegistrationStatus,
                TaxBack = entity.TaxBack,
                Packages = entity.Packages,
                Towbar = entity.Towbar,
                Photos = entity.Photos,
                VehicleInfo = entity.VehicleInfo
            };
        }

    }




}