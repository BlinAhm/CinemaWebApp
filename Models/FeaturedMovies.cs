namespace CinemaApp.Models
{
    public class FeaturedMovies
    {
        public int Id { get; set; }
        
        public List<Movie> Movies { get; set; }

        public FeaturedMovies()
        {
            Movies = new List<Movie>();
        }
    }
}
