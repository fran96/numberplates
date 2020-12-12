using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NumberPlates.Data.Entities;

namespace NumberPlates.WebApi.Business.Interfaces
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentEntity>> GetAllCommentsAsync();
        Task<IEnumerable<CommentEntity>> GetCommentsByNumberPlateIdAsync(int numberPlateId);
        Task<IEnumerable<CommentEntity>> GetCommentsByNumberPlateAsync(string numberPlate);
        Task<CommentEntity> GetCommentAsync(int id);
        Task<CommentEntity> CreateCommentAsync(string comment, string numberPlate, string ipAddress);
    }
}
