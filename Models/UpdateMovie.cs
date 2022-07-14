namespace CinemaApp.Models
{
    public class UpdateMovie
    {
        public string ImageLink { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public float Rating { get; set; }
        public string Director { get; set; }
        public string TrailerID { get; set; }
        public int Duration { get; set; }
        public double Price { get; set; }
        public int mId { get; set; }
    }
}
