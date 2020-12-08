using System.Collections.Generic;
using System.Threading.Tasks;
using NumberPlates.Data.Entities;

namespace NumberPlates.Data.Interfaces
{
    public interface ICommentRepository : IGenericRepository<CommentEntity>
    {
        Task<IEnumerable<CommentEntity>> GetCommentsIncludeNumberPlateAsync();
        Task<IEnumerable<CommentEntity>> GetCommentsByNumberPlateIdAsync(int numberPlateId);
        Task<IEnumerable<CommentEntity>> GetCommentsByNumberPlateAsync(string numberPlate);
        Task<CommentEntity> GetCommentIncludeNumberPlateAsync(int id);
    }
}
