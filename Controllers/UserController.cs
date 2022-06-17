using Microsoft.AspNetCore.Mvc;
using CinemaApp.Models;
using Microsoft.AspNetCore.Authorization;

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
        [AllowAnonymous]
        [Route("Add")]
        public IActionResult AddUser([FromForm] User user)
        {
            if (!_dalUser.isEmailRegistered(user))
            {
                _dalUser.AddUser(user);

                return StatusCode(200);
            }

            return StatusCode(400, "Email already registered!");
        }

        [HttpPost]
        [Route("Update")]
        public IActionResult UpdateUser([FromForm]User user)
        {
            _dalUser.UpdateUser(user);
            return StatusCode(200);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _dalUser.GetById(id);

            if(user.Name == null)
                return StatusCode(404, "User not found!");
            else
            {
                _dalUser.DeleteUser(id);
                return StatusCode(200);
            }
            
        }
    }
}
