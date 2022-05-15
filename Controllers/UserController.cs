using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CinemaApp.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

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

        //WIP
        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<IActionResult> LogIn([FromForm] string email, [FromForm] string password)
        {
            var userId = _dalUser.accountExists(email, password);

            if (userId != -1)
            {
                var user = _dalUser.GetById(userId);
                var claims = new[]
                {
                    new Claim("UserId", user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim("LastName", user.LastName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role == 1 ? "Admin" : "Client")
                };

                var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                await HttpContext.SignInAsync(new ClaimsPrincipal(identity));
                return Redirect("https://localhost:44465/home");
            }
            else
                return StatusCode(400, "Account does not Exist!");
        }
        //WIP
        [HttpPost]
        [Route("Logout")]
        public async Task<IActionResult> OnGetAsync()
        {

            // Clear the existing external cookie
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Redirect("https://localhost:44465/home");
        }
    }
}
