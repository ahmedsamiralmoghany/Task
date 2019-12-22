using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Task.api.Data;
using Task.api.Helper;
using Task.api.Model;
using Task.Api.Helper;

namespace Task.api.Controllers
{
    [ApiController]
    [Route("api/employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _repo;

        public EmployeeController(IEmployeeRepository repo)
        {
            _repo = repo;
        }
             [HttpGet("{id}")]
        public async Task<IActionResult> GetEmploye(int id)
        {
            var employe = await _repo.GetEmployee(id);
            return Ok(employe);
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployees([FromQuery]EmpParms parms)
        {
            PagedList<Employee> employees = await _repo.GetEmployees(parms);
            Response.AddPagination(employees.CurrentPage, employees.PageSize,employees.TotalCount, employees.TotalPage);
            var paged = new PagedClass<PagedList<Employee>>
            {
                Pagination = new PaginationHeader(employees.CurrentPage, employees.PageSize, employees.TotalCount, employees.TotalPage),
                Result = employees
            };
            return Ok(paged);
        }
        [HttpPost]
        public async Task<IActionResult> AddEmployee(Employee employee)
        {
            await _repo.AddEmployee(employee);
            return Ok(employee);

        }
        [HttpPut]
        public async Task<IActionResult> EditEmployee(Employee employee)
        {
            await _repo.EditEmployee(employee);
            return Ok(employee);

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _repo.GetEmployee(id);
            if (employee == null)
                return BadRequest("Not Found");
            _repo.DeleteEmployee(employee);
            return Ok();
        }

    }
}