using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NumberPlates.Data.Interfaces;
using Microsoft.Extensions.Logging;
using NumberPlates.Data.Entities;
using NumberPlates.WebApi.Business.Interfaces;
using System.ComponentModel.DataAnnotations;
using NumberPlates.WebApi.Data.Interfaces;

namespace NumberPlates.WebApi.Business
{
    public class NumberPlateService : INumberPlateService
    {

        private readonly INumberPlateRepository _numberPlateRepository;

        public NumberPlateService(INumberPlateRepository numberPlateRepository)
        {
            _numberPlateRepository = numberPlateRepository;
        }

        public async Task<IEnumerable<NumberPlateEntity>> GetAllNumberPlatesAsync()
        {
            var numberPlates = await _numberPlateRepository.GetListAsync(p => true);
            return numberPlates.OrderBy(p => p.NumberPlate);
        }

        public async Task<NumberPlateEntity> GetNumberPlateByIdAsync(int id) {
            return await _numberPlateRepository.GetFirstAsync(p => p.Id == id);
        }

        public async Task<NumberPlateEntity> GetNumberPlateAsync(string numberPlate)
        {
            return await _numberPlateRepository.GetNumberPlateAsync(numberPlate.ToLower());
        }

        public async Task<NumberPlateEntity> CreateNumberPlateAsync(string numberPlate) {
            var newEntity = new NumberPlateEntity
            {
                NumberPlate = numberPlate.ToLower()
            };
            await _numberPlateRepository.CreateAsync(newEntity);
            return newEntity;
        }
        public async Task<NumberPlateEntity> UpdateNumberPlateAsync(int id, string numberPlate) {
            var updateEntity = await _numberPlateRepository.GetFirstAsync(p => p.Id == id);
            if (updateEntity == null)
            {
                throw new ValidationException("NumberPlate does not exist.");
            }

            updateEntity.NumberPlate = numberPlate.ToLower();
            await _numberPlateRepository.UpdateAsync(updateEntity);

            return updateEntity;
        }
        public async Task<bool> DeleteNumberPlateAsync(int id) {
            var deleteEntity = await _numberPlateRepository.GetFirstAsync(p => p.Id == id);
            if (deleteEntity == null)
            {
                throw new ValidationException("NumberPlate does not exist.");
            }

            await _numberPlateRepository.DeleteAsync(deleteEntity);

            return true;
        }
    }
}
