using ActivityTrackerAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace ActivityTrackerAPI.Services
{
    public class PasswordService
    {
        private readonly PasswordHasher<Models.User> _passwordHasher;

        public PasswordService()
        {
            _passwordHasher = new PasswordHasher<User>();
        }

        public string HashPassword(User user, string password)
        {
            return _passwordHasher.HashPassword(user, password);
        }

        public PasswordVerificationResult VerifyHashedPassword(User user, string hashedPassword, string providedPassword)
        {
            return _passwordHasher.VerifyHashedPassword(user, hashedPassword, providedPassword);
        }

    }
}
