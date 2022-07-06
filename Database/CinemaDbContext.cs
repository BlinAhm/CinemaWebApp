using CinemaApp.Models;
using Microsoft.EntityFrameworkCore;

namespace CinemaApp.Database
{
    public class CinemaDbContext : DbContext
    {
        public CinemaDbContext(DbContextOptions<CinemaDbContext> options)
            : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<ComingSoon> ComingSoonMovies { get; set; }
        public DbSet<FeaturedMovies> FeaturedMovies { get; set; }
        public DbSet<Actor> Actors { get; set; }

        public DbSet<ContactUs> ContactUs { get; set; }
        public DbSet<Dictionary<string, object>> ActorMovie => Set<Dictionary<string, object>>("ActorMovie");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Activity>().ToTable("Activity");
            modelBuilder.Entity<Movie>().ToTable("Movie");
            modelBuilder.Entity<ComingSoon>().ToTable("ComingSoonMovies");
            modelBuilder.Entity<FeaturedMovies>().ToTable("FeaturedMovies");
            modelBuilder.Entity<Actor>().ToTable("Actor");
            modelBuilder.Entity<ContactUs>().ToTable("ContactUs");
            modelBuilder.Entity<Movie>()
                .HasMany(a => a.Actors)
                .WithMany(m => m.Movies)
                .UsingEntity(x => x.ToTable("ActorMovie"));

        }
    }
}
