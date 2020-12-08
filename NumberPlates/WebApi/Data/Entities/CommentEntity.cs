using System;
namespace NumberPlates.Data.Entities
{
    public class CommentEntity
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public DateTime Timestamp { get; set; }
        public string IpAddress { get; set; }
        public int NumberPlateId { get; set; }
        public NumberPlateEntity NumberPlate { get; set; }
    }
}
