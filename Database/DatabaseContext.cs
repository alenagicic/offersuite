using Microsoft.EntityFrameworkCore;
using OfferSuite.Entity;

namespace OfferSuite.Database{

    public class DatabaseContext : DbContext{

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {}

        public DbSet<OfferEntity> OfferEntities { get; set; }

        public DbSet<AccountEntity> AccountEntities {get;set;}

        public DbSet<LastSignedIn> SignedInEntities {get;set;}

    }
}