using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task.api.Model;
using Task.Api.Helper;

namespace Task.api.Helper
{
    public class PagedClass<T>
    {
        public PaginationHeader Pagination { get; set; }
        public T Result { get; set; }
    }
}
