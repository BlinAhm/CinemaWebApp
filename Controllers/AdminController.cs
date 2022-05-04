using Microsoft.AspNetCore.Mvc;
using CinemaApp.Models;


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

    }
}
