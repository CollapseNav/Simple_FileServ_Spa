using System;
using System.Linq;
using System.Linq.Expressions;

namespace Api.Common
{
    public static class QueryClass
    {
        public static IQueryable<T> WhereIf<T>(this IQueryable<T> query, bool flag, Expression<Func<T, bool>> expression)
        {
            return flag ? query.Where(expression) : query;
        }

        public static IQueryable<T> WhereIf<T>(this IQueryable<T> query, string flag, Expression<Func<T, bool>> expression)
        {
            return string.IsNullOrEmpty(flag) ? query : query.Where(expression);
        }
    }

}
