using CinemaApp.Auth;
using CinemaApp.Database;
using CinemaApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public IActionResult AddBooking([FromForm] int movieId, [FromForm] int hallId, [FromForm] DateTime date, [FromForm]string seats, [FromForm] string userId)
        {
            var seatArray = seats.Split("-");
            foreach (var seatId in seatArray)
            {
                var booking = GetAll().Find(x => x.SeatId == seatId);
                if (booking != null) { return StatusCode(500, new { Text = "One or more seats are already reserved!" }); }
            }
            foreach (var seatId in seatArray)
            {
                var booking = new Bookings() { SeatId = seatId, UserId = userId };
                var hall = _context.HallMovies.Where(x => x.HallId == hallId && x.MovieId == movieId && x.Date == date).FirstOrDefault();
                hall.Bookings.Add(booking);

                if (hall.Bookings.Find(x => x.UserId == userId && x.SeatId == seatId) == null)
                {
                    return StatusCode(500, new { Text = "Seat: " + seatId + " could not be reserved!" });
                }
            }

            _context.SaveChanges();
            return Ok(new {Text = "Seats booked successfully!" });
        }
    }
}
