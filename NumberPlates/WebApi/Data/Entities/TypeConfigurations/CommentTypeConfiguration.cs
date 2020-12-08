
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NumberPlates.Data.Entities.TypeConfigurations
{
    public class CommentTypeConfiguration : IEntityTypeConfiguration<CommentEntity>
    {
        public void Configure(EntityTypeBuilder<CommentEntity> builder)
        {
            builder.ToTable("comments");
            builder.HasKey(prop => prop.Id);

            builder.Property(prop => prop.Comment);

            builder.Property(prop => prop.Timestamp);

            builder.Property(prop => prop.IpAddress);

            builder.HasOne(prop => prop.NumberPlate)
                .WithMany(p=> p.Comments)
                .HasForeignKey(p=>p.NumberPlateId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);

            builder.HasData(
                new CommentEntity
                {
                    Id = 1,
                    Comment = "Doesn't know what an indicator is.",
                    Timestamp = DateTime.Today,
                    IpAddress = "12.3.4",
                    NumberPlateId = 1
                }
            );
        }
    }
}
