﻿namespace CinemaApp.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string ImageLink { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public virtual List<Actor> Actors { get; set; }
        public float Rating { get; set; }

        public Movie()
        {
            Actors = new List<Actor>();
        }
    }
}
