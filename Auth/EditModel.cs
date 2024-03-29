﻿using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Auth
{
    public class EditModel
    {
        [Required(ErrorMessage = "First name is required")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string? LastName { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        public string? FirstEmail { get; set; }
    }
}
