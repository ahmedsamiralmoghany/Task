using Microsoft.EntityFrameworkCore;
using Task.api.Model;

namespace Task.api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options){}
        public DbSet<Employee> Employees { get; set; }
    }
}