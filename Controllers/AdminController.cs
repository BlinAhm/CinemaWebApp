using Microsoft.AspNetCore.Mvc;
using CinemaApp.Models;
using Microsoft.AspNetCore.Authorization;

namespace CinemaApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DAL.Admin _dalAdmin;

        public AdminController(DAL.Admin dalAdmin)
        {
            _dalAdmin = dalAdmin;
        }



        [HttpGet]
        [Route("GetAll")]
        public List<Admin> GetAllAdmins()
        {
            return _dalAdmin.GetAll();
        }
        [HttpPost]
        [AllowAnonymous]
        [Route("Add")]
        public IActionResult AddAdmin([FromForm] int userId)
        {
            _dalAdmin.AddAdmin(userId);
            return StatusCode(200);
        }

        [HttpGet]
        [Route("Remove/{id}")]
        public IActionResult RemoveAdmin(int id)
        {
            _dalAdmin.RemoveAdmin(id);
            return StatusCode(200);
        }
    }
}
