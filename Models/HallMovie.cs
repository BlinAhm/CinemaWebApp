namespace CinemaApp.Models
{
    public class HallMovie
    {
        public DateTime Date { get; set; }

        public List<Bookings> Bookings { get; set; }
        public List<VipSeats> VipSeats { get; set; }
        public int HallId { get; set; }
        public Hall Hall { get; set; }

        public int MovieId { get; set; }
        public Movie Movie { get; set; }

        public HallMovie()
        {
            Bookings = new List<Bookings>();
            VipSeats = new List<VipSeats>();
        }
    }
}
