using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CinemaApp.Models;

namespace CinemaApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DAL.User _dalUser;

        public UserController(DAL.User dalUser)
        {
            _dalUser = dalUser;
        }

        [HttpGet]
        [Route("GetById/{id}")]
        public User GetUser(int id)
        {
            return _dalUser.GetById(id);
        }

        [HttpGet]
        [Route("GetAll")]
        public List<User> GetAllUsers()
        {
            return _dalUser.GetAll();
        }

        [HttpPost]
        [Route("Add")]
        public IActionResult AddUser([FromForm]User user)
        {
            return Redirect("https://localhost:44465/home");
        }
    }
}
