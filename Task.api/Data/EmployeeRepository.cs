using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Task.api.Model;
using Task.Api.Helper;

namespace Task.api.Data
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;

        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Employee> AddEmployee(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public void DeleteEmployee(Employee employee)
        {
            _context.Employees.Remove(employee);
            _context.SaveChanges();
        }

        public async Task<Employee> EditEmployee(Employee employee)
        {
            _context.Entry(employee).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> GetEmployee(int id)
        {
            return await _context.Employees.FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<PagedList<Employee>> GetEmployees(EmpParms parms)
        {
            var employees = _context.Employees.Where(i=>(!string.IsNullOrEmpty( parms.Name)? i.Name.Contains(parms.Name):true)&&(!string.IsNullOrEmpty( parms.Phone)? i.Mobile.Contains(parms.Phone):true));
            return await PagedList<Employee>.CreatAsync(employees, parms.PageNumber, parms.PageSize);
        }
        public async Task<List<Employee>> GetAllEmployees()
        {
            var employees =await _context.Employees.Take(10).ToListAsync();
            return employees;
        }


    }
}