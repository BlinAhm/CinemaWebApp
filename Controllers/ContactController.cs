using CinemaApp.Database;
using CinemaApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly CinemaDbContext _context;
        public ContactController(CinemaDbContext context)
        {
           
            _context = context;
        }


        [Route("add")]
        [HttpPost]
        public void AddContact([FromForm]ContactUs model)
        {
            _context.ContactUs.Add(model);
            _context.SaveChanges();
        }

        [Route("getAll")]
        [HttpGet]
        public List<ContactUs> GetAll()
        {
            return _context.ContactUs.ToList();
        }
    }
}
