using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NumberPlates.Data.Interfaces;

namespace NumberPlates.Data.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly NumberPlateDbContext Entities;

        public GenericRepository(NumberPlateDbContext entities)
        {
            Entities = entities;
        }

        public async Task<T> CreateAsync(T entity)
        {
            await Entities.Set<T>().AddAsync(entity);
            await Entities.SaveChangesAsync();
            return entity;
        }

        public async Task<T> UpdateAsync(T entity)
        {
            Entities.Set<T>().Update(entity);
            await Entities.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(T entity)
        {
            Entities.Set<T>().Remove(entity);
            await Entities.SaveChangesAsync();
        }

        public async Task<T> GetFirstAsync(Expression<Func<T, bool>> expression, bool includeSoftDeleted=false)
        {
            return await Entities.Set<T>()
            .Where(expression)
            .FirstOrDefaultAsync(expression);
        }

        public async Task<IEnumerable<T>> GetListAsync(Expression<Func<T, bool>> expression, bool includeSoftDeleted=false)
        {
            return await Entities.Set<T>()
            .Where(expression)
            .ToListAsync();
        }
    }
}
