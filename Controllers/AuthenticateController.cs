using CinemaApp.Auth;
using CinemaApp.Database;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CinemaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly CinemaDbContext _context;

        public AuthenticateController(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            CinemaDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }

        [HttpGet]
        [Route("GetAll")]
        public List<ApplicationUser> GetUsers()
        {
            return _userManager.Users.ToList();
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        [Route("GetByEmail")]
        public ApplicationUser GetUser([FromForm] string email)
        {
            var user = _userManager.FindByEmailAsync(email);
            return user.Result;
        }

        [Authorize]
        [HttpDelete]
        [Route("DeleteUser/{email}")]
        public async Task<IActionResult> Delete(string email)
        {
            await _userManager.DeleteAsync(GetUser(email));
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                return StatusCode(500, new Response { Status = "Error", Message = "Unable to delete user!" });
            }

            var adminEmail = HttpContext.User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault();
            _context.Activities.Add(new Models.Activity()
            {
                Act = $"Admin {adminEmail} deleted user: {email}",
                Date = DateTime.Parse(DateTime.Now.ToString())
            });
            _context.SaveChanges();
            return StatusCode(200, new Response { Status = "Success", Message = "User deleted successfully!" });
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromForm] LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.FirstName),
                    new Claim("lastName", user.LastName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var token = GetToken(authClaims);

                _context.Activities.Add(new Models.Activity()
                {
                    Act = $"New login from: {user.Email}",
                    Date = DateTime.Parse(DateTime.Now.ToString())
                });
                _context.SaveChanges();
                /*var cookieOptions = new CookieOptions { Domain = "localhost", MaxAge = new TimeSpan(3,0,0),  IsEssential = true, SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Strict};
                HttpContext.Response.Cookies.Append("JWTtoken", new JwtSecurityTokenHandler().WriteToken(token),cookieOptions);
                HttpContext.Response.Cookies.Append("JWTExpiration", token.ValidTo.ToString("yyyy-MM-ddTHH:mm"),cookieOptions);*/

                return Ok(new
                {
                    admin = userRoles.ToArray(),
                    userId = user.Id,
                    user = new[] { user.FirstName, user.LastName, user.Email },
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> Register([FromForm] RegisterModel model)
        {
            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            ApplicationUser user = new()
            {
                UserName = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            _context.Activities.Add(new Models.Activity()
            {
                Act = $"New user registration: {user.Email}",
                Date = DateTime.Parse(DateTime.Now.ToString())
            });
            _context.SaveChanges();
            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromForm] RegisterModel model)
        {
            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            ApplicationUser user = new()
            {
                UserName = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString()

            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            if (!await _roleManager.RoleExistsAsync(UserRoles.Admin))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await _roleManager.RoleExistsAsync(UserRoles.User))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.User));

            if (await _roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await _userManager.AddToRoleAsync(user, UserRoles.Admin);
            }
            if (await _roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await _userManager.AddToRoleAsync(user, UserRoles.User);
            }

            _context.Activities.Add(new Models.Activity()
            {
                Act = $"New admin registration: {user.Email}",
                Date = DateTime.Parse(DateTime.Now.ToString())
            });
            _context.SaveChanges();
            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        [Route("CreateUser")]
        public async Task<IActionResult> CreateUser([FromForm] RegisterModel model)
        {
            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "User already exists!" });

            ApplicationUser user = new()
            {
                UserName = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            _context.Activities.Add(new Models.Activity()
            {
                Act = $"Admin created a new user: {user.Email}",
                Date = DateTime.Parse(DateTime.Now.ToString())
            });
            _context.SaveChanges();
            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        [Route("EditUser")]
        public async Task<IActionResult> EditUser([FromForm] EditModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.FirstEmail);

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User update failed!" });
            }

            return Ok(new Response { Status = "Success", Message = "User edit successful!" });
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}