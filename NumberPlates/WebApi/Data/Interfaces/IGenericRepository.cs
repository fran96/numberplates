using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace NumberPlates.Data.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> CreateAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task<T> GetFirstAsync(Expression<Func<T, bool>> expression, bool includeSoftDeleted=false);
        Task<IEnumerable<T>> GetListAsync(Expression<Func<T, bool>> expression, bool includeSoftDeleted=false);
    }
}
