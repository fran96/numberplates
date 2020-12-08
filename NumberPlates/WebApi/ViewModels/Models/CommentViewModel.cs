using System;

namespace NumberPlates.WebApi.ViewModels.Models
{
    public class CommentViewModel
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public DateTime Timestamp { get; set; }
        public string NumberPlate { get; set; }
    }
}
