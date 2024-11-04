using ActivityTrackerAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Web;

namespace ActivityTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VerificationController : ControllerBase
    {
        private readonly VerificationService _verificationService;
        private readonly AppDbContext _context;

        public VerificationController(VerificationService verificationService, AppDbContext context)
        {
            _verificationService = verificationService;
            _context = context;
        }

        [HttpGet("verify")]
        public IActionResult Verify(string token)
        {
            var decodedToken = HttpUtility.UrlDecode(token);

            var user = _context.Users.SingleOrDefault(u => u.VerificationToken == decodedToken);
            if (user == null)
            {
                return BadRequest("Invalid token");
            }

            user.isVerified = true;
            _context.SaveChanges();

            return Ok("Email verified successfully");
        }

    }
}
