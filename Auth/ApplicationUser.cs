using Microsoft.AspNetCore.Identity;

namespace CinemaApp.Auth
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
