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
    public class AchievementsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AchievementsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Achievements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Achievement>>> GetAchievements()
        {
            return await _context.Achievements.ToListAsync();
        }

        // GET: api/Achievements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Achievement>> GetAchievement(int id)
        {
            var achievement = await _context.Achievements.FindAsync(id);

            if (achievement == null)
            {
                return NotFound();
            }

            return achievement;
        }

        // GET: api/Achievements/User/5
        [HttpGet("User/{UserID}")]
        public async Task<ActionResult<Achievement>> GetUserAchievements(int UserID)
        {
            var achievements = await _context.Achievements.Where(a => a.UserID == UserID).FirstOrDefaultAsync();
            if(achievements == null)
            {
                return NotFound();
            }
            return achievements;
        }

        [HttpGet("WeeklySteps/User/{UserID}")]
        public async Task<ActionResult<ActivityData>> GetWeeklySteps(int UserID)
        {
            DateTime today = DateTime.Today;
            int daysSinceMonday = (int)today.DayOfWeek - (int)DayOfWeek.Monday;
            if (daysSinceMonday < 0) daysSinceMonday += 7;

            DateTime currentMonday = today.AddDays(-daysSinceMonday);
            DateTime currentSunday = currentMonday.AddDays(6);

            var totalSteps = await _context.ActivityData.Where(a => a.UserID == UserID && (a.Date <= currentSunday && a.Date >= currentMonday)).SumAsync(a => a.Steps);
            
            return Ok(totalSteps);
        }

        [HttpGet("DaysInRow/User/{UserID}")]
        public async Task<ActionResult<bool>> GetDaysInRowToAchievement(int UserID)
        {
            DateTime today = DateTime.Today;

            var lastSevenDays = await _context.ActivityData
                .Where(a => a.Date <= today && a.UserID == UserID)
                .OrderByDescending(a => a.Date)
                .Take(7)
                .ToListAsync();
            if(lastSevenDays.Count < 7)
            {
                return Ok(false);
            }

            var lastSevenDaysIds = lastSevenDays.Select(a => a.ID).ToList();

            var lastSevenDaysTraining = await _context.TrainingData
                .Where(t => lastSevenDaysIds.Contains(t.ActivityDataID)).ToListAsync();
            if(lastSevenDaysTraining.Count < 7)
            {
                return Ok(false);
            }

            bool allValid = lastSevenDays.All(record =>
                record.Steps.HasValue && record.Steps.Value > 0 &&
                record.Calories.HasValue && record.Calories.Value > 0 &&
                record.Water.HasValue && record.Water.Value > 0 &&
                record.SleepTime.HasValue && record.SleepTime.Value > 0
            );

            bool allTrainingsValid = lastSevenDaysTraining.All(record =>
                record.TrainingTime.HasValue && record.TrainingTime.Value > 0
            );
            if (allValid && allTrainingsValid)
                return Ok(true);
            else 
                return Ok(false);
            

        }

        // PUT: api/Achievements/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAchievement(int id, Achievement achievement)
        {
            if (id != achievement.ID)
            {
                return BadRequest();
            }

            _context.Entry(achievement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AchievementExists(id))
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

        [HttpGet("PerfectDayAchievementVerification/User/{UserID}")]
        public async Task<ActionResult<bool>> VerifyPerfectDayAchievement(int UserID)
        {
            DateTime today = DateTime.Today;
            DateTime tomorrow = today.AddDays(1);
            var activityDataRecord = await _context.ActivityData.Where(a => a.UserID == UserID && a.Date >= today && a.Date < tomorrow).FirstOrDefaultAsync();
            if (activityDataRecord == null) { return NotFound("ActivityData record not found"); }

            int activityDataID = activityDataRecord.ID;

            var scores = await _context.results.Where(r => r.ActivityDataID == activityDataID).FirstOrDefaultAsync();
            var trainingScore = await _context.TrainingData.Where(t => t.ActivityDataID == activityDataID).FirstOrDefaultAsync();

            if (
                scores.StepsScore == 100 &&
                scores.CaloriesScore == 100 &&
                scores.SleepScore == 100 &&
                scores.WaterScore == 100 &&
                trainingScore.TrainingScore == 100
             )
                return Ok(true);
            else
                return Ok(false);
        }

        // One field update methods PUT

        //PUT LevelAchievement1
        [HttpPut("update-achievement1/{UserID}")] 
        public async Task<IActionResult> PutAchievement1(int UserID)
        {
            var achievements = await _context.Achievements.Where(a => a.UserID == UserID).FirstOrDefaultAsync();
            achievements.LevelAchievement1 = true;
            _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("update-achievement2/{UserID}")]
        public async Task<IActionResult> PutAchievement2(int UserID)
        {
            var achievements = await _context.Achievements.Where(a => a.UserID == UserID).FirstOrDefaultAsync();
            achievements.LevelAchievement2 = true;
            _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("update-achievement3/{UserID}")]
        public async Task<IActionResult> PutAchievement3(int UserID)
        {
            var achievements = await _context.Achievements.Where(a => a.UserID == UserID).FirstOrDefaultAsync();
            achievements.LevelAchievement3 = true;
            _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("update-achievement4/{UserID}")]
        public async Task<IActionResult> PutAchievement4(int UserID)
        {
            var achievements = await _context.Achievements.Where(a => a.UserID == UserID).FirstOrDefaultAsync();
            achievements.ActivityAchievement1 = true;
            _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("update-achievement5/{UserID}")]
        public async Task<IActionResult> PutAchievement5(int UserID)
        {
            var achievements = await _context.Achievements.Where(a => a.UserID == UserID).FirstOrDefaultAsync();
            achievements.ActivityAchievement2 = true;
            _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("update-achievement6/{UserID}")]
        public async Task<IActionResult> PutAchievement6(int UserID)
        {
            var achievements = await _context.Achievements.Where(a => a.UserID == UserID).FirstOrDefaultAsync();
            achievements.ActivityAchievement3 = true;
            _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("update-pinned-achievement1/{UserID}")]
        public async Task<IActionResult> PutPinnedAchievement1(int UserID, string? AchievementName)
        {
            var achievements = await _context.Achievements.Where(a => a.UserID == UserID).FirstOrDefaultAsync();
            achievements.PinnedAchievement1 = AchievementName;
            _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("update-pinned-achievement2/{UserID}")]
        public async Task<IActionResult> PutPinnedAchievement2(int UserID, string? AchievementName)
        {
            var achievements = await _context.Achievements.Where(a => a.UserID == UserID).FirstOrDefaultAsync();
            achievements.PinnedAchievement2 = AchievementName;
            _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("update-pinned-achievement3/{UserID}")]
        public async Task<IActionResult> PutPinnedAchievement3(int UserID, string? AchievementName)
        {
            var achievements = await _context.Achievements.Where(a => a.UserID == UserID).FirstOrDefaultAsync();
            achievements.PinnedAchievement3 = AchievementName;
            _context.SaveChangesAsync();
            return NoContent();
        }
        // POST: api/Achievements
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Achievement>> PostAchievement(Achievement achievement)
        {
            _context.Achievements.Add(achievement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAchievement", new { id = achievement.ID }, achievement);
        }

        // DELETE: api/Achievements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAchievement(int id)
        {
            var achievement = await _context.Achievements.FindAsync(id);
            if (achievement == null)
            {
                return NotFound();
            }

            _context.Achievements.Remove(achievement);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AchievementExists(int id)
        {
            return _context.Achievements.Any(e => e.ID == id);
        }
    }
}
