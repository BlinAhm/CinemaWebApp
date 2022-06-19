namespace CinemaApp.Models
{
    public class UpdateMovie
    {
        public string ImageLink { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public float Rating { get; set; }
        public int mId { get; set; }
    }
}
