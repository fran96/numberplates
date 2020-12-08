
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NumberPlates.Data.Entities.TypeConfigurations
{
    public class NumberPlateTypeConfiguration : IEntityTypeConfiguration<NumberPlateEntity>
    {
        public void Configure(EntityTypeBuilder<NumberPlateEntity> builder)
        {
            builder.ToTable("numberplates");
            builder.HasKey(prop => prop.Id);

            builder.Property(prop => prop.NumberPlate)
                .HasMaxLength(30);
            builder.HasIndex(p => p.NumberPlate)
                .IsUnique();

            builder.HasData(
                new NumberPlateEntity
                {
                    Id = 1,
                    NumberPlate = "COR 010"
                }
            );
        }
    }
}
