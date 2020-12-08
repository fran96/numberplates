
using System.Collections.Generic;
using System.Threading.Tasks;
using NumberPlates.Data.Entities;

namespace NumberPlates.WebApi.Business.Interfaces
{

    public interface INumberPlateService
    {
        Task<IEnumerable<NumberPlateEntity>> GetAllNumberPlatesAsync();
        Task<NumberPlateEntity> GetNumberPlateByIdAsync(int id);
        Task<NumberPlateEntity> GetNumberPlateAsync(string numberPlate);
        Task<NumberPlateEntity> CreateNumberPlateAsync(string numberPlate);
        Task<NumberPlateEntity> UpdateNumberPlateAsync(int id, string numberPlate);
        Task<bool> DeleteNumberPlateAsync(int id);
    }

}
