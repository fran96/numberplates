using System.Collections.Generic;
using System.Threading.Tasks;
using NumberPlates.Data.Entities;
using NumberPlates.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using NumberPlates.Data;
using NumberPlates.WebApi.Data.Interfaces;
using NumberPlates.Data.Repositories;

namespace NumberPlates.WebApi.Data.Repositories
{
    public class NumberPlateRepository : GenericRepository<NumberPlateEntity>, INumberPlateRepository
    {
        public NumberPlateRepository(NumberPlateDbContext entities) : base(entities)
        {
        }

        public async Task<NumberPlateEntity> GetNumberPlateAsync(string numberPlate)
        {
            return await Entities.Set<NumberPlateEntity>()
                .FirstOrDefaultAsync(p => p.NumberPlate.ToLower() == numberPlate.ToLower());
        }
    }
}
