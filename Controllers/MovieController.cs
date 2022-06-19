﻿using CinemaApp.Auth;
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
            await _context.SaveChangesAsync();

            if (await _context.Movies.FindAsync(id) == null)
            {
                return StatusCode(200, new Response { Status = "Success", Message = "Movie deleted!" });
            }
            return StatusCode(500, new Response { Status = "Error", Message = "Unable to delete movie!" });
        }

        [Route("AddFeatured/{id}")]
        [HttpGet]
        public async Task<IActionResult> AddFeatured(int id)
        {
            var featured = await _context.FeaturedMovies.FindAsync(1);
            var size = GetFeatured().First().Movies.Count;
            if (size == 2)
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

        [Route("GetAllActors")]
        [HttpGet]
        public List<Actor> GetActors()
        {
            return _context.Actors.ToList();
        }

        [Route("GetCast/{id}")]
        [HttpGet]
        public List<Actor> GetCast(int id)
        {
            var movie = _context.Movies.Include("Actors").Where(x => x.Id == id);

            return movie.First().Actors;
        }

        [Route("FindById/{id}")]
        [HttpGet]
        public async Task<Movie> FindById(int id)
        {
            return await _context.Movies.FindAsync(id);
        }

        [Route("Update")]
        [HttpPost]
        public async Task<IActionResult> UpdateMovie([FromForm] UpdateMovie model)
        {
            var movie = await _context.Movies.FindAsync(model.mId);

            movie.ImageLink = model.ImageLink;
            movie.Title = model.Title;
            movie.Description = model.Description;
            movie.Category = model.Category;
            movie.Rating = model.Rating;

            await _context.SaveChangesAsync();

            return Ok("Movie updated successfully!");
        }

        [Route("UpdateCast")]
        [HttpPost]
        public async Task<IActionResult> UpdateCast([FromForm] UpdateCast model)
        {
            var act = _context.Actors.ToList();

            //checks if actors already exist and creates new actors if they do not exist
            Actor? act1;
            Actor? act2;
            Actor? act3;

            if(model.A1Id == 0)
            {
                act1 = new Actor{ FirstName = model.Actor1.Split(' ')[0], LastName = model.Actor1.Split(' ')[1] };
                await _context.Actors.AddAsync(act1);
                await _context.SaveChangesAsync();        
            }
            else if (model.A1Id == -1)
            {
                act1 = null;
            }
            else
            {
                act1 = act.Where(x => x.Id == model.A1Id).First();
            }

            if (model.A2Id == 0)
            {
                act2 = new Actor { FirstName = model.Actor2.Split(' ')[0], LastName = model.Actor2.Split(' ')[1] };
                await _context.Actors.AddAsync(act2);
                await _context.SaveChangesAsync();
            }
            else if (model.A2Id == -1)
            {
                act2 = null;
            }
            else
            {
                act2 = act.Where(x => x.Id == model.A2Id).First();
            }

            if (model.A3Id == 0)
            {
                act3 = new Actor { FirstName = model.Actor3.Split(' ')[0], LastName = model.Actor3.Split(' ')[1] };
                await _context.Actors.AddAsync(act3);
                await _context.SaveChangesAsync();
            }
            else if (model.A3Id == -1)
            {
                act3 = null;
            }
            else
            {
                act3 = act.Where(x => x.Id == model.A3Id).First();
            }

            var movie = _context.Movies.Include("Actors").Where(x => x.Id == model.mId);
            movie.First().Actors.Clear();

            if(act1 != null)
                movie.First().Actors.Add(act1);
            if (act2 != null)
                movie.First().Actors.Add(act2);
            if (act3 != null)
                movie.First().Actors.Add(act3);

            await _context.SaveChangesAsync();
            return Ok();


        }
        //delete
        [Route("Test/{id}")]
        [HttpGet]
        public async Task<List<Actor>> Test(int id)
        {
            var movie = _context.Movies.Include("Actors").Where(x => x.Id == id);
            var actors = movie.First().Actors;

            actors.Clear();

            return actors;
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
