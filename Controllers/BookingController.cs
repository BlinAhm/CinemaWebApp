using CinemaApp.Auth;
using CinemaApp.Database;
using CinemaApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CinemaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly CinemaDbContext _context;
        public BookingController(CinemaDbContext context)
        {
            _context = context;
        }

        [Route("GetAll")]
        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet]
        public List<Bookings> GetAll()
        {
            return _context.Bookings.ToList();
        }

        [Route("Add")]
        [Authorize(Roles = UserRoles.User)]
        [HttpPost]
        public async Task<IActionResult> AddBooking(string seatId)
        {
            var booking = GetAll().Find(x => x.SeatId == seatId);
            return Ok();
        }
    }
}
