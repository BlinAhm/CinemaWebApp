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

            if (_context.Movies.Find(movie.Id) == null)
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
            if (await _context.Movies.FindAsync(id) == null)
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, new Response { Status = "Success", Message = "Movie deleted!" });
            }
            return StatusCode(500, new Response { Status = "Error", Message = "Unable to delete movie!" });
        }

        [Route("AddFeatured/{id}")]
        [HttpGet]
        public async Task<IActionResult> AddFeatured(int id)
        {
            var featured = await _context.FeaturedMovies.FindAsync(1);
            if (featured.Movies.Count == 2)
            {
                return StatusCode(400, "Featured list is full! Remove a featured movie to insert.");
            }
            else
            {
                var movie = await _context.Movies.FindAsync(id);
                featured.Movies.Add(movie);

                await _context.SaveChangesAsync();
                return StatusCode(200, "Movie added successfully");
            }
        }

        [Route("RemoveFeatured/{id}")]
        [HttpDelete]
        public async Task<IActionResult> RemoveFeatured(int id)
        {
            var featured = await _context.FeaturedMovies.FindAsync(1);

            var movie = await _context.Movies.FindAsync(id);
            if (featured.Movies.Contains(movie))
            {
                featured.Movies.Remove(movie);
                await _context.SaveChangesAsync();

                return StatusCode(200, "Movie removed successfully");
            }
            else
            {
                return StatusCode(500, "Movie could not be removed!");
            }      
        }

        [Route("GetFeatured")]
        [HttpGet]
        public List<FeaturedMovies> GetFeatured()
        {
            return _context.FeaturedMovies.Include("Movies").ToList();
        }

        [Route("GetComingSoon")]
        [HttpGet]
        public List<ComingSoon> GetComingSoon()
        {
            return _context.ComingSoonMovies.ToList();
        }

        [Route("AddComingSoon")]
        [HttpPost]
        public async Task<IActionResult> AddComingSoon([FromForm] ComingSoon movie)
        {
            await _context.ComingSoonMovies.AddAsync(movie);
            await _context.SaveChangesAsync();

            if (_context.ComingSoonMovies.Find(movie.Id) == null)
            {
                return StatusCode(500, new Response { Status = "Error", Message = "Unable to add movie!" });
            }

            return StatusCode(200, new Response { Status = "Success", Message = "Movie added successfully!" });
        }

        [Route("DeleteComingSoon/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteComingSoon(int id)
        {
            var movie = await _context.ComingSoonMovies.FindAsync(id);
            _context.ComingSoonMovies.Remove(movie);
            await _context.SaveChangesAsync();
            if (await _context.ComingSoonMovies.FindAsync(id) == null)
            {
                return StatusCode(200, new Response { Status = "Success", Message = "Movie deleted!" });
            }
            return StatusCode(500, new Response { Status = "Error", Message = "Unable to delete movie!" });
        }
    }
}
