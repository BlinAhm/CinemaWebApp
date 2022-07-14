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
        public DbSet<Hall> Halls { get; set; }
        public DbSet<ComingSoon> ComingSoonMovies { get; set; }
        public DbSet<FeaturedMovies> FeaturedMovies { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<ContactUs> ContactUs { get; set; }
        public DbSet<Bookings> Bookings { get; set; }
        public DbSet<HallMovie> HallMovies { get; set; }
        public DbSet<Dictionary<string, object>> ActorMovie => Set<Dictionary<string, object>>("ActorMovie");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Activity>().ToTable("Activity");
            modelBuilder.Entity<Movie>().ToTable("Movie");
            modelBuilder.Entity<Hall>().ToTable("Hall");
            modelBuilder.Entity<ComingSoon>().ToTable("ComingSoonMovies");
            modelBuilder.Entity<FeaturedMovies>().ToTable("FeaturedMovies");
            modelBuilder.Entity<Actor>().ToTable("Actor");
            modelBuilder.Entity<ContactUs>().ToTable("ContactUs");

            modelBuilder.Entity<Bookings>().HasKey(k => new { k.SeatId, k.UserId });
            modelBuilder.Entity<Bookings>().ToTable("Bookings");

            modelBuilder.Entity<Movie>()
                .HasMany(a => a.Actors)
                .WithMany(m => m.Movies)
                .UsingEntity(x => x.ToTable("ActorMovie"));

            modelBuilder.Entity<HallMovie>()
                .HasKey(t => new { t.HallId, t.MovieId, t.Date });

            modelBuilder.Entity<HallMovie>()
                .HasOne(hm => hm.Hall)
                .WithMany(h => h.HallMovies)
                .HasForeignKey(hm => hm.HallId);

            modelBuilder.Entity<HallMovie>()
                .HasOne(hm => hm.Movie)
                .WithMany(m => m.HallMovies)
                .HasForeignKey(hm => hm.MovieId);


        }
    }
}
