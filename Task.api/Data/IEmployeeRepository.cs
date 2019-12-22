
using System.Collections.Generic;
using System.Threading.Tasks;
using Task.api.Model;
using Task.Api.Helper;

namespace Task.api.Data
{
    public interface IEmployeeRepository
    {
        Task<PagedList<Employee>> GetEmployees(EmpParms parms);
        Task<Employee> AddEmployee(Employee employee);
        Task<Employee> EditEmployee(Employee employee);

        void DeleteEmployee(Employee employee);
        Task<Employee> GetEmployee(int id);

Task<List<Employee>> GetAllEmployees();

    }
}