using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ActivityTrackerAPI;
using ActivityTrackerAPI.Models;
using System.Reflection.Metadata.Ecma335;

namespace ActivityTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityDataController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ActivityDataController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ActivityData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityData>>> GetActivityData()
        {
            return await _context.ActivityData.ToListAsync();
        }

        // GET: api/ActivityData/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityData>> GetActivityData(int id)
        {
            var activityData = await _context.ActivityData.FindAsync(id);

            if (activityData == null)
            {
                return NotFound();
            }

            return activityData;
        }

        // GET: api/ActivityData/UserID
        [HttpGet("user/{UserID}")]
        public async Task<ActionResult<IEnumerable<ActivityData>>> getUserActivitityData(int UserID)
        {
            var activityData = await _context.ActivityData.Where(a => a.UserID == UserID).ToListAsync();
            if (activityData == null)
            {
                return NotFound();
            }
            return activityData;
        }

        // PUT: api/ActivityData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivityData(int id, ActivityData activityData)
        {
            if (id != activityData.ID)
            {
                return BadRequest();
            }

            _context.Entry(activityData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityDataExists(id))
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

        [HttpPut("complete-day/{UserID}")]
        public async Task<IActionResult> CompleteDay(int ID)
        {
            var ActivityData = await _context.ActivityData.Where(a => a.ID == ID).FirstOrDefaultAsync();
            ActivityData.Completed = true;
            _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("no-complete-day/{UserID}")]
        public async Task<IActionResult> NoCompleteDay(int ID)
        {
            var ActivityData = await _context.ActivityData.Where(a => a.ID == ID).FirstOrDefaultAsync();
            ActivityData.Completed = false;
            _context.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/ActivityData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> CreateActivityData([FromBody] ActivityData activityData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FindAsync(activityData.UserID);
            if (user == null)
            {
                return NotFound("User not found");
            }

            activityData.User = user;

            _context.ActivityData.Add(activityData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivityData", new { id = activityData.ID }, activityData);
        }

        [HttpGet("check-if-exists")]
        public async Task<ActionResult<bool>> CheckIfRecordExists(int UserID)
        { 
            var today = DateTime.Today;
            var recordExists = await _context.ActivityData.Where(a => a.Date.Date == today && a.UserID == UserID).FirstOrDefaultAsync();

            if (recordExists != null)
            {
                return true;
            }
            else 
            {
                return false;
            }
        }

        [HttpGet("GetID")]
        public async Task<ActionResult<int>> GetTodaysRecordID(int userID)
        {
            var today = DateTime.Today;
            var record = await _context.ActivityData.Where(r => EF.Functions.DateDiffDay(r.Date, today) == 0 && r.UserID == userID).FirstOrDefaultAsync();
            if(record == null)
            {
                return NotFound();
            }

            return Ok(record.ID);
        }

        [HttpGet("summary")]
        public async Task<IActionResult> FilterByDate(int? year, int? month, int? day, int userID)
        {
            if (year != null && month != null && day == null) 
            {
                var results = await _context.ActivityData.Where(a => a.Date.Year == year && a.Date.Month == month && a.UserID == userID).ToListAsync();
                var activityDataIds = results.Select(a => a.ID).ToList();
                var CardioTrainings = await _context.TrainingData.Where(t => activityDataIds.Contains(t.ActivityDataID) && t.TrainingType == "cardio").ToListAsync();
                var StrengthTrainings = await _context.TrainingData.Where(t => activityDataIds.Contains(t.ActivityDataID) && t.TrainingType == "strength").ToListAsync();
                var scores = await _context.results.Where(r => activityDataIds.Contains((int)r.ActivityDataID)).ToListAsync();
                if (results.Count == 0)
                {
                    return NotFound("Not found for month");
                }
                var summary = new
                {
                    totalSteps = results.Sum(a => a.Steps),
                    totalCalories = results.Sum(a => a.Calories),
                    totalWater = results.Sum(a => a.Water),
                    averageSteps = results.Average(a => a.Steps),
                    averageCalories = results.Average(a => a.Calories),
                    averageWater = results.Average(a => a.Water),
                    averageSleep = results.Average(a => a.SleepTime),
                    maxSteps = results.Max(a => a.Steps),
                    maxCalories = results.Max(a => a.Calories),
                    maxSleep = results.Max(a => a.SleepTime),
                    maxWater = results.Max(a => a.Water),
                    totalCardioTime = CardioTrainings.Sum(c => c.TrainingTime),
                    averageCardioHeartRate = CardioTrainings.Average(c => c.AverageHeartRate),
                    totalStrengthTime = StrengthTrainings.Sum(s => s?.TrainingTime),
                    averageStrengthHeartRate = StrengthTrainings.Average(s => s?.AverageHeartRate),
                    maxCardioTime = CardioTrainings.Max(c => c.TrainingTime),
                    maxStrengthTime = StrengthTrainings.Max(s => s?.TrainingTime),
                    averageCardioTime = CardioTrainings.Average(c => c?.TrainingTime),
                    averageStrengthTime = StrengthTrainings.Average(s => s?.TrainingTime),
                    averageScore = scores.Average(s => s?.Overall),
                    stepsScore = scores.Average(s => s?.StepsScore),
                    caloriesScore = scores.Average(s => s?.CaloriesScore),
                    sleepScore = scores.Average(s => s?.SleepScore),
                    waterScore = scores.Average(s => s?.WaterScore),
                    cardioScore = CardioTrainings.Average(c => c?.TrainingScore),
                    strengthScore = StrengthTrainings.Average(s => s?.TrainingScore)
                };
                return Ok(summary);

            }
            else if (year != null && month != null && day != null)
            {
                var results = await _context.ActivityData.Where(a => a.Date.Year == year && a.Date.Month == month && a.Date.Day == day && a.UserID == userID).ToListAsync();
                var activityDataIds = results.Select(a => a.ID).ToList();
                var CardioTrainings = await _context.TrainingData.Where(t => activityDataIds.Contains(t.ActivityDataID) && t.TrainingType == "cardio").ToListAsync();
                var StrengthTrainings = await _context.TrainingData.Where(t => activityDataIds.Contains(t.ActivityDataID) && t.TrainingType == "strength").ToListAsync();
                var scores = await _context.results.Where(r => activityDataIds.Contains((int)r.ActivityDataID)).ToListAsync();
                if (results.Count == 0 || results == null)
                {
                    return NotFound("Not found for day");
                }
                var summary = new
                {
                    totalSteps = results.Sum(a => a.Steps),
                    totalCalories = results.Sum(a => a.Calories),
                    totalWater = results.Sum(a => a.Water),
                    totalSleep = results.Sum(a => a.SleepTime),
                    cardioTrainingTime = CardioTrainings.Select(c => c.TrainingTime),
                    cardioTrainingHeartRate = CardioTrainings.Select(c => c.AverageHeartRate),
                    strengthTrainingTime = StrengthTrainings.Select(s => s.TrainingTime),
                    strengthTrainingHeartRate = StrengthTrainings.Select(s => s.AverageHeartRate),
                    averageScore = scores.Select(s => s.Overall),
                    stepsScore = scores.Average(s => s?.StepsScore),
                    caloriesScore = scores.Average(s => s?.CaloriesScore),
                    sleepScore = scores.Average(s => s?.SleepScore),
                    waterScore = scores.Average(s => s?.WaterScore),
                    cardioScore = CardioTrainings.Average(c => c?.TrainingScore),
                    strengthScore = StrengthTrainings.Average(s => s?.TrainingScore)
                };
                return Ok(summary);

            }
            else if (year != null && month == null && day == null)
            {
                var results = await _context.ActivityData.Where(a => a.Date.Year == year && a.UserID == userID).ToListAsync();
                var activityDataIds = results.Select(a => a.ID).ToList();
                var CardioTrainings = await _context.TrainingData.Where(t => activityDataIds.Contains(t.ActivityDataID) && t.TrainingType == "cardio").ToListAsync();
                var StrengthTrainings = await _context.TrainingData.Where(t => activityDataIds.Contains(t.ActivityDataID) && t.TrainingType == "strength").ToListAsync();
                var scores = await _context.results.Where(r => activityDataIds.Contains((int)r.ActivityDataID)).ToListAsync();
                if (results.Count == 0 || results == null)
                {
                    return NotFound("Not found for year");
                }
                var summary = new
                {
                    totalSteps = results.Sum(a => a.Steps),
                    totalCalories = results.Sum(a => a.Calories),
                    totalWater = results.Sum(a => a.Water),
                    averageSteps = results.Average(a => a.Steps),
                    averageCalories = results.Average(a => a.Calories),
                    averageWater = results.Average(a => a.Water),
                    averageSleep = results.Average(a => a.SleepTime),
                    maxSteps = results.Max(a => a.Steps),
                    maxCalories = results.Max(a => a.Calories),
                    maxSleep = results.Max(a => a.SleepTime),
                    maxWater = results.Max(a => a.Water),
                    totalCardioTime = CardioTrainings.Sum(c => c.TrainingTime),
                    averageCardioHeartRate = CardioTrainings.Average(c => c.AverageHeartRate),
                    totalStrengthTime = StrengthTrainings.Sum(s => s?.TrainingTime),
                    averageStrengthHeartRate = StrengthTrainings.Average(s => s?.AverageHeartRate),
                    maxCardioTime = CardioTrainings.Max(c => c.TrainingTime),
                    maxStrengthTime = StrengthTrainings.Max(s => s?.TrainingTime),
                    averageCardioTime = CardioTrainings.Average(c => c?.TrainingTime),
                    averageStrengthTime = StrengthTrainings.Average(s => s?.TrainingTime),
                    averageScore = scores.Average(s => s?.Overall),
                    stepsScore = scores.Average(s => s?.StepsScore),
                    caloriesScore = scores.Average(s => s?.CaloriesScore),
                    sleepScore = scores.Average(s => s?.SleepScore),
                    waterScore = scores.Average(s => s?.WaterScore),
                    cardioScore = CardioTrainings.Average(c => c?.TrainingScore),
                    strengthScore = StrengthTrainings.Average(s => s?.TrainingScore)
                };
                return Ok(summary);

            }
            else 
            {
                return BadRequest();
            }
        }

            // DELETE: api/ActivityData/5
            [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivityData(int id)
        {
            var activityData = await _context.ActivityData.FindAsync(id);
            if (activityData == null)
            {
                return NotFound();
            }

            _context.ActivityData.Remove(activityData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActivityDataExists(int id)
        {
            return _context.ActivityData.Any(e => e.ID == id);
        }
    }
}
