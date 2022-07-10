﻿namespace CinemaApp.Models
{
    public class HallMovie
    {
        public DateTime Date { get; set; }

        public List<Bookings> Bookings { get; set; }
        public int HallId { get; set; }
        public Hall Hall { get; set; }

        public int MovieId { get; set; }
        public Movie Movie { get; set; }
    }
}
