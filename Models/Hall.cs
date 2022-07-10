namespace CinemaApp.Models
{
    public class Hall
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Seats { get; set; }
        public int VIPseats { get; set; }
        public virtual List<HallMovie> HallMovies { get; set; }
        public bool Is3D { get; set; }

        public Hall()
        {
            HallMovies = new List<HallMovie>();
        }
    }
}
