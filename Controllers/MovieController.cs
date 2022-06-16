using CinemaApp.Auth;
using CinemaApp.Database;
using CinemaApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly CinemaDbContext _context;
        public MovieController(CinemaDbContext context)
        {
            _context = context;
        }

        [Route("GetAll")]
        [HttpGet]
        public List<Movie> GetMovies()
        {
            return _context.Movies.Include("Actors").ToList();
        }

        [Route("Add")]
        [HttpPost]
        public async Task<IActionResult> AddMovie([FromForm] Movie movie)
        {
            await _context.Movies.AddAsync(movie);
            await _context.SaveChangesAsync();

            if(_context.Movies.Find(movie.Id) == null)
            {
                return StatusCode(500, new Response { Status = "Error", Message = "Unable to add movie!" });
            }

            return StatusCode(200, new Response { Status = "Success", Message = "Movie added successfully!" });
        }

        [Route("Delete/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            _context.Movies.Remove(movie);
            if(await _context.Movies.FindAsync(id) == null)
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, new Response { Status = "Success", Message = "Movie deleted!" });
            }
            return StatusCode(500, new Response { Status = "Error", Message = "Unable to delete movie!" });
        }

        [Route("GetComingSoon")]
        [HttpGet]
        public List<ComingSoon> GetComingSoon()
        {
            return _context.SoonMovies.ToList();
        }

        [Route("AddComingSoon")]
        [HttpPost]
        public async Task<IActionResult> AddComingSoon([FromForm] ComingSoon movie)
        {
            await _context.SoonMovies.AddAsync(movie);
            await _context.SaveChangesAsync();

            if (_context.SoonMovies.Find(movie.Id) == null)
            {
                return StatusCode(500, new Response { Status = "Error", Message = "Unable to add movie!" });
            }

            return StatusCode(200, new Response { Status = "Success", Message = "Movie added successfully!" });
        }

        [Route("DeleteComingSoon/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteComingSoon(int id)
        {
            var movie = await _context.SoonMovies.FindAsync(id);
            _context.SoonMovies.Remove(movie);
            await _context.SaveChangesAsync();
            if (await _context.SoonMovies.FindAsync(id) == null)
            {
                return StatusCode(200, new Response { Status = "Success", Message = "Movie deleted!" });
            }
            return StatusCode(500, new Response { Status = "Error", Message = "Unable to delete movie!" });
        }
    }
}
