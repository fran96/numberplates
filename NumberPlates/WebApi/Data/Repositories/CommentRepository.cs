using System.Collections.Generic;
using System.Threading.Tasks;
using NumberPlates.Data.Entities;
using NumberPlates.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace NumberPlates.Data.Repositories
{
    public class CommentRepository : GenericRepository<CommentEntity>, ICommentRepository
    {
        public CommentRepository(NumberPlateDbContext entities) : base(entities)
        {
        }

        public async Task<CommentEntity> GetCommentIncludeNumberPlateAsync(int id)
        {
            return await Entities.Set<CommentEntity>()
                .Include(c => c.NumberPlate)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

         public async Task<IEnumerable<CommentEntity>> GetCommentsByNumberPlateIdAsync(int numberPlateId)
        {
            return await Entities.Set<CommentEntity>()
                .Include(comment => comment.NumberPlate)
                .Where(comment => comment.NumberPlateId==numberPlateId)
                .ToListAsync();
        }


         public async Task<IEnumerable<CommentEntity>> GetCommentsByNumberPlateAsync(string numberPlate)
        {
            return await Entities.Set<CommentEntity>()
                .Include(comment => comment.NumberPlate)
                .Where(comment => comment.NumberPlate.NumberPlate == numberPlate.ToLower())
                .ToListAsync();
        }

        public async Task<IEnumerable<CommentEntity>> GetCommentsIncludeNumberPlateAsync()
        {
            return await Entities.Set<CommentEntity>()
                .Include(comment => comment.NumberPlate)
                .ToListAsync();
        }
    }
}
