using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NumberPlates.Data.Interfaces;
using Microsoft.Extensions.Logging;
using NumberPlates.Data.Entities;
using NumberPlates.WebApi.Business.Interfaces;
using System.Linq;
using NumberPlates.WebApi.Data.Interfaces;

namespace NumberPlates.WebApi.Business
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly INumberPlateRepository _numberPlateRepository;
        private readonly INumberPlateService _numberPlateService;

        public CommentService(ICommentRepository commentRepository, INumberPlateRepository numberPlateRepository, INumberPlateService numberPlateService)
        {
            _commentRepository = commentRepository;
            _numberPlateRepository = numberPlateRepository;
            _numberPlateService = numberPlateService;
        }

        public async Task<IEnumerable<CommentEntity>> GetAllCommentsAsync()
        {
            return await _commentRepository.GetCommentsIncludeNumberPlateAsync();
        }

        public async Task<IEnumerable<CommentEntity>> GetCommentsByNumberPlateIdAsync(int numberPlateId) {
            return await _commentRepository.GetCommentsByNumberPlateIdAsync(numberPlateId);
        }

        public async Task<IEnumerable<CommentEntity>> GetCommentsByNumberPlateAsync(string numberPlate) {
           return await _commentRepository.GetCommentsByNumberPlateAsync(numberPlate.ToLower());
        }

        public async  Task<CommentEntity> GetCommentAsync(int id) {
            return await _commentRepository.GetCommentIncludeNumberPlateAsync(id);
        }

        public async Task<CommentEntity> CreateCommentAsync(string comment, string numberPlate, string ipAddress) {

            numberPlate=numberPlate.ToLower();
            NumberPlateEntity numberPlateEntity;
            numberPlateEntity = await _numberPlateRepository.GetNumberPlateAsync(numberPlate);
            if (numberPlateEntity == null)
            {
                var newNumberPlate = await _numberPlateService.CreateNumberPlateAsync(numberPlate);
                numberPlateEntity = newNumberPlate;
            }

            var newEntity = new CommentEntity
            {
                Comment = comment,
                Timestamp = DateTime.UtcNow,
                IpAddress = ipAddress,
                NumberPlateId = numberPlateEntity.Id
            };
            await _commentRepository.CreateAsync(newEntity);
            return newEntity;
        }
    }
}
