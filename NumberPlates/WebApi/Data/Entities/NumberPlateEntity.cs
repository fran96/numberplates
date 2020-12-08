using System;
using System.Collections.Generic;

namespace NumberPlates.Data.Entities
{
    public class NumberPlateEntity 
    {
        public int Id { get; set; }
        public string NumberPlate { get; set; }
        public ICollection<CommentEntity> Comments { get; set; }
    }
}
