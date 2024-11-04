using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ActivityTrackerAPI;
using ActivityTrackerAPI.Models;

namespace ActivityTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        //GET api/Users/name-surname
        [HttpGet("{name}/{surname}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersByName(string name, string surname)
        {
            var users = await _context.Users.Where(u => u.name == name && u.surname == surname).ToListAsync();
            if(users == null)
            {
                return NotFound("User of that name and surname not found in database");
            }

            var results = users.Select(user => new
            {
                user.userID,
                user.username,
                user.name,
                user.surname,
                user.age,
                user.city,
                user.Image,
                Status = _context.Friends
            .Where(f =>
                ( f.Friend2ID == user.userID))
            .Select(f => f.Status)
            .FirstOrDefault() ?? "none" 
            }).ToList();

            return Ok(results);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.userID)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (await _context.Users.AnyAsync(u => u.email == user.email))
            {
                return BadRequest("User with this email already exists.");
            }

            var verificationToken = GenerateUniqueVerificationToken();
            user.VerificationToken = verificationToken;

            user.password = BCrypt.Net.BCrypt.HashPassword(user.password);

            var userConfig = new UserConfig();
            userConfig.Id = 0;
            userConfig.User = user;
            userConfig.Gender = user.gender;
            user.userConfigID = userConfig.Id;

            _context.Users.Add(user);
            _context.userConfigs.Add(userConfig);
            await _context.SaveChangesAsync();

            var newUserId = user.userID;
            return CreatedAtAction("GetUser", new { id = newUserId }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("check-user")]
        public async Task<IActionResult> CheckUser([FromBody] UserLoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Invalid request");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.email == request.Email);

            if (user == null)
            {
                return NotFound("User not found");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.password))
            {
                return Unauthorized("Incorrect password");
            }

            if (!user.isVerified)
            {
                return Unauthorized("User is not verified");
            }

            return Ok(true);
        }

        [HttpPost("upload-image/{userId}")]
        public async Task<IActionResult> UploadUserImage(int userId, IFormFile image)
        {
            if (image == null || image.Length == 0)
            {
                return BadRequest("No image uploaded.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.userID == userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);
                user.Image = memoryStream.ToArray();
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok("Image uploaded successfully.");
        }

        [HttpGet("{userId}/photo")]
        public async Task<IActionResult> GetUserPhoto(int userId)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.userID == userId);

                if (user == null || user.Image == null)
                {
                    return NotFound("User or photo not found.");
                }

                return File(user.Image, "image/jpeg");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetUsername/{id}")]
        public async Task<ActionResult<string>> GetUsername(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.userID == id);
            if(user == null)
            {
                return NotFound();
            }
            return user.username;
        }

            [HttpGet("getId/{email}")]
        public async Task<ActionResult<int>> GetUserIdByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.email == email);

            if(user == null)
            {
                return NotFound();
            }

            return user.userID;
        }

        public class UserLoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.userID == id);
        }

        private string GenerateUniqueVerificationToken()
        {
            var uniqueGuid = Guid.NewGuid();

            var token = uniqueGuid.ToString();

            return token;
        }
    }
}
