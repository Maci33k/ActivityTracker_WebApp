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
    public class UserLevelsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserLevelsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/UserLevels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserLevel>>> GetUserLevels()
        {
            return await _context.UserLevels.ToListAsync();
        }

        // GET: api/UserLevels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserLevel>> GetUserLevel(int id)
        {
            var userLevel = await _context.UserLevels.FindAsync(id);

            if (userLevel == null)
            {
                return NotFound();
            }

            return userLevel;
        }

        //GET api/UserLevels/user/5
        [HttpGet("user/{UserID}")]
        public async Task<ActionResult<UserLevel>> GetUserLevelByUserID(int UserID)
        {
            var userLevel = await _context.UserLevels.Where(lvl => lvl.UserID == UserID).FirstOrDefaultAsync();

            if (userLevel == null)
            {
                return NotFound("User or level record not found. Check if user of that ID exists");
            }
            return userLevel;
        }

        // PUT: api/UserLevels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserLevel(int id, UserLevel userLevel)
        {
            if (id != userLevel.Id)
            {
                return BadRequest();
            }

            _context.Entry(userLevel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserLevelExists(id))
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

        [HttpPut("user/{UserID}/experience")]
        public async Task<IActionResult> PutExperience(int UserID, int experience)
        {
            var userLevel = await _context.UserLevels.Where(lvl => lvl.UserID == UserID).FirstOrDefaultAsync();
            if (userLevel == null)
            {
                return NotFound("User or level record not found. Check if user of that ID exists");
            }

            userLevel.Experience = experience;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserLevelExists(userLevel.Id))
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

        [HttpPut("user/{UserID}/currentLevel")]
        public async Task<IActionResult> PutCurrentLevel(int UserID, int level)
        {
            var userLevel = await _context.UserLevels.Where(lvl => lvl.UserID == UserID).FirstOrDefaultAsync();
            if (userLevel == null)
            {
                return NotFound("User or level record not found. Check if user of that ID exists");
            }

            userLevel.Level = level;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserLevelExists(userLevel.Id))
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

        [HttpPut("user/{UserID}/total-experience")]
        public async Task<IActionResult> PutTotalExperience(int UserID, int experience)
        {
            var userLevel = await _context.UserLevels.Where(lvl => lvl.UserID == UserID).FirstOrDefaultAsync();
            if (userLevel == null)
            {
                return NotFound("User or level record not found. Check if user of that ID exists");
            }

            userLevel.TotalExperience = experience;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserLevelExists(userLevel.Id))
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

        [HttpPut("user/{UserID}/next-level-experience")]
        public async Task<IActionResult> PutNextLevel(int UserID, int experience)
        {
            var userLevel = await _context.UserLevels.Where(lvl => lvl.UserID == UserID).FirstOrDefaultAsync();
            if (userLevel == null)
            {
                return NotFound("User or level record not found. Check if user of that ID exists");
            }

            userLevel.NextLevelExperience = experience;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserLevelExists(userLevel.Id))
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

        // POST: api/UserLevels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserLevel>> PostUserLevel(UserLevel userLevel)
        {
            _context.UserLevels.Add(userLevel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserLevel", new { id = userLevel.Id }, userLevel);
        }

        // DELETE: api/UserLevels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserLevel(int id)
        {
            var userLevel = await _context.UserLevels.FindAsync(id);
            if (userLevel == null)
            {
                return NotFound();
            }

            _context.UserLevels.Remove(userLevel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserLevelExists(int id)
        {
            return _context.UserLevels.Any(e => e.Id == id);
        }
    }
}
