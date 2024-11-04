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
    public class UserConfigsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserConfigsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/UserConfigs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserConfig>>> GetuserConfigs()
        {
            return await _context.userConfigs.ToListAsync();
        }

        // GET: api/UserConfigs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserConfig>> GetUserConfig(int id)
        {
            var userConfig = await _context.userConfigs.FindAsync(id);

            if (userConfig == null)
            {
                return NotFound();
            }

            return userConfig;
        }

        // PUT: api/UserConfigs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserConfig(int id, UserConfig userConfig)
        {
            if (id != userConfig.Id)
            {
                return BadRequest();
            }

            _context.Entry(userConfig).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserConfigExists(id))
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

        [HttpPut("{userConfigId}/tracked-activities")]
        public async Task<IActionResult> PutTrackedActivitiesByUserConfig(int userConfigId, TrackedActivities updatedTrackedActivities)
        {
            var trackedActivities = await _context.TrackedActivities
                .FirstOrDefaultAsync(ta => ta.UserConfig.Id == userConfigId);

            if (trackedActivities == null)
            {
                return NotFound();
            }

            trackedActivities.SleepTime = updatedTrackedActivities.SleepTime;
            trackedActivities.Steps = updatedTrackedActivities.Steps;
            trackedActivities.Water = updatedTrackedActivities.Water;
            trackedActivities.Calories = updatedTrackedActivities.Calories;
            trackedActivities.Training = updatedTrackedActivities.Training;

            _context.Entry(trackedActivities).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrackedActivitiesExists(userConfigId))
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

        // POST: api/UserConfigs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserConfig>> PostUserConfig(UserConfig userConfig)
        {
            _context.userConfigs.Add(userConfig);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserConfig", new { id = userConfig.Id }, userConfig);
        }

        [HttpPost("{userConfigID}/tracked-activities")]
        public async Task<ActionResult<TrackedActivities>> PostTrackedActivities(TrackedActivities trackedActivities, int userConfigID)
        {
            var userConfig = await _context.userConfigs.FindAsync(userConfigID);

            if (userConfig == null)
            {
                return BadRequest("UserConfig not found");
            }

            trackedActivities.UserConfig = userConfig;

            _context.TrackedActivities.Add(trackedActivities);
            await _context.SaveChangesAsync();

            userConfig.TrackedActivitiesID = trackedActivities.Id;
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTrackedActivityForUserConfig),
                          new { userConfigId = userConfigID }, trackedActivities);
        }


        [HttpGet("{userConfigId}/tracked-activities")]
        public async Task<ActionResult<TrackedActivities>> GetTrackedActivityForUserConfig(int userConfigId)
        {
            var trackedActivity = await _context.TrackedActivities
                .Include(ta => ta.UserConfig)
                .FirstOrDefaultAsync(ta => ta.UserConfig.Id == userConfigId);

            if (trackedActivity == null)
            {
                return NotFound();
            }

            return trackedActivity;
        }

        // DELETE: api/UserConfigs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserConfig(int id)
        {
            var userConfig = await _context.userConfigs.FindAsync(id);
            if (userConfig == null)
            {
                return NotFound();
            }

            _context.userConfigs.Remove(userConfig);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserConfigExists(int id)
        {
            return _context.userConfigs.Any(e => e.Id == id);
        }

        private bool TrackedActivitiesExists(int id)
        {
            return _context.TrackedActivities.Any(e => e.Id == id);
        }
    }
}
