using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace NumberPlates.Data
{
    public class NumberPlateDbContext : DbContext
    {
        public NumberPlateDbContext(DbContextOptions<NumberPlateDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .ApplyConfigurationsFromAssembly(typeof(NumberPlateDbContext).Assembly);

            base.OnModelCreating(modelBuilder);
        }
    }
}
