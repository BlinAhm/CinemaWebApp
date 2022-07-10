namespace CinemaApp.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string ImageLink { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public virtual List<Actor> Actors { get; set; }
        public virtual List<HallMovie> HallMovies { get; set; }
        public int? Length { get; set; }
        public float Rating { get; set; }
        public Director? Director { get; set; }
        public string TrailerID { get; set; }

        public Movie()
        {
            Actors = new List<Actor>();
            HallMovies = new List<HallMovie>();
        }
    }
}
