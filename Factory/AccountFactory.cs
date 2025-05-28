using OfferSuite.Model;
using OfferSuite.Entity;

namespace OfferSuite.Factory
{
    public class AccountFactory
    {
        public AccountModel MapAccountEntityToModel(AccountEntity entity)
        {
            if (entity == null) return null!;

            return new AccountModel
            {
                Id = entity.Id,
                Email = entity.Email,
                Password = entity.Password,
                CompanyName = entity.CompanyName,
                OrganisationNumber = entity.OrganisationNumber,
                Address = entity.Address,
                AddressCo = entity.AddressCo,
                PhoneNumber = entity.PhoneNumber,
                PostalCode = entity.PostalCode,
                City = entity.City,
                County = entity.County,
                SubscriptionType = entity.SubscriptionType,
                PaymentMethod = entity.PaymentMethod,
                EmailResponseApprove = entity.EmailResponseApprove,
                EmailResponseDecline = entity.EmailResponseDecline,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt
            };
        }

        public AccountEntity MapAccountModelToEntity(AccountModel model)
        {
            if (model == null) return null!;

            return new AccountEntity
            {
                Id = model.Id,
                Email = model.Email,
                Password = model.Password,
                CompanyName = model.CompanyName,
                OrganisationNumber = model.OrganisationNumber,
                Address = model.Address,
                AddressCo = model.AddressCo,
                PhoneNumber = model.PhoneNumber,
                PostalCode = model.PostalCode,
                City = model.City,
                County = model.County,
                SubscriptionType = model.SubscriptionType,
                PaymentMethod = model.PaymentMethod,
                EmailResponseApprove = model.EmailResponseApprove,
                EmailResponseDecline = model.EmailResponseDecline,
                CreatedAt = model.CreatedAt,
                UpdatedAt = model.UpdatedAt
            };
        }
    }
}
