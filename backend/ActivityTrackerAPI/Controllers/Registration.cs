using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices.Marshalling;

namespace ActivityTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly EmailService _emailService;
        private readonly AppDbContext _context;

        public RegistrationController(EmailService emailService, AppDbContext context)
        {
            _emailService = emailService;
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegistrationRequest request)
        {
            
            var user = _context.Users.SingleOrDefault(u => u.userID == request.UserId);
            if (user == null)
            {
                return NotFound("User not found");
            }

           
            var token = user.VerificationToken;

            
            _emailService.SendVerificationEmail(request.Email, token);

            return Ok("Registration Successful");
        }

    }

    public class RegistrationRequest
    {
        public string Email { get; set; }
        public int UserId { get; set; }
    }

}