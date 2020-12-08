using System.Collections.Generic;
using System.Threading.Tasks;
using NumberPlates.Data.Entities;
using NumberPlates.Data.Interfaces;

namespace NumberPlates.WebApi.Data.Interfaces
{
    public interface INumberPlateRepository : IGenericRepository<NumberPlateEntity>
    {
        Task<NumberPlateEntity> GetNumberPlateAsync(string numberPlate);
    }
}
