using CinemaApp.Database;
using Microsoft.AspNetCore.Mvc;

namespace CinemaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly CinemaDbContext _context;
        public ActivityController(CinemaDbContext context)
        {
            _context = context;
        }

        [Route("GetAll")]
        [HttpGet]
        public List<Models.Activity> GetAll()
        {
            return _context.Activities.ToList();
        }
    }
}
