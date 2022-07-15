using CinemaApp.Database;
using CinemaApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HallController : ControllerBase
    {
        private readonly CinemaDbContext _context;
        public HallController(CinemaDbContext context)
        {
            _context = context;
        }

        [Route("GetAll")]
        [HttpGet]
        public List<Hall> GetHalls()
        {
            return _context.Halls.Include("HallMovies").ToList();
        }

        [Route("GetAllHM")]
        [HttpGet]
        public HallMovie GetHallM()
        {
            return _context.Halls.Include("HallMovies").First().HallMovies.First();
        }

        [Route("GetByMovie/{id}")]
        [HttpGet]
        public List<Hall> GetHallsForMovie(int id)
        {
            return _context.Halls.Include("HallMovies").Where(x => x.HallMovies.Where(y => y.MovieId == id).ToList().Count != 0).ToList();
        }

        [Route("GetSeats/{id}")]
        [HttpGet]
        public int[] GetSeats(int id)
        {
            var hall = _context.Halls.Where(x => x.Id == id).First();
            int seats = hall.Seats;
            

            int[] allSeats = new int[] { seats};
            return allSeats;
        }

        [Route("GetBooking/{hallId}&{movieId}&{date}")]
        [HttpGet]
        public List<Bookings> GetBookings(int hallId, int movieId, DateTime date)
        {
            return _context.HallMovies.Include("Bookings").Where(x => x.HallId == hallId && x.MovieId == movieId && x.Date == date).First().Bookings.ToList();
        }

        [Route("GetVipSeats/{hallId}&{movieId}&{date}")]
        [HttpGet]
        public string[] VipSeats(int hallId, int movieId, DateTime date)
        {
            var seatsHm = _context.HallMovies.Include("VipSeats").Where(x => x.HallId == hallId && x.MovieId == movieId && x.Date == date).FirstOrDefault();
            var seats = seatsHm.VipSeats.FirstOrDefault().Seats;
            return seats.Split('-');
        }

        [Route("GetDatesForMovie/{hallId}&{movieId}")]
        [HttpGet]
        public List<DateTime> GetDates(int hallId, int movieId)
        {
            return _context.HallMovies.Where(x => x.HallId == hallId && x.MovieId == movieId).Select(x => x.Date).ToList();
        }
    }
}