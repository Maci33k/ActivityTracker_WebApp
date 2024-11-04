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
    public class ResultsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ResultsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Results
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Results>>> Getresults()
        {
            return await _context.results.ToListAsync();
        }

        // GET: api/Results/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Results>> GetResults(int id)
        {
            var results = await _context.results.FindAsync(id);

            if (results == null)
            {
                return NotFound();
            }

            return results;
        }

        //Get all data for specific user
        [HttpGet("user/{userID}")]
        public async Task<ActionResult<IEnumerable<Models.Results>>> GetUsersResults(int userID)
        {
            var results = await _context.results.Where(r => r.UserID == userID).ToListAsync();

            if (results == null || !results.Any())
            {
                return NotFound();
            }

            return Ok(results);
        }

        //Get today's scores record
        [HttpGet("activity-data/{activityDataID}/today")]
        public async Task<ActionResult<Models.Results>> GetTodaysResults(int activityDataID)
        {
            var today = DateTime.Today;
            var todayRecord = await _context.ActivityData
                .Where(a => a.Date.Date == today && a.ID == activityDataID)
                .FirstOrDefaultAsync();
            if(todayRecord == null)
            {
                return NotFound("Activity Data of todays date not found. Try to add some data in app to create activity data record");
            }

            var todaysResultsRecord = await _context.results
                .Where(r => r.ActivityDataID == todayRecord.ID)
                .FirstOrDefaultAsync();

            if (todaysResultsRecord == null)
            {
                return NotFound("Results record of todays date not found");
            }
            return Ok(todaysResultsRecord);
        }

        // PUT: api/Results/steps/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("steps/{ActivityDataID}")]
        public async Task<IActionResult> PutResultsSteps(int ActivityDataID, int stepsScore)
        {
            var foundResults = await _context.results.Where(r => r.ActivityDataID == ActivityDataID).FirstOrDefaultAsync();
            if (foundResults == null)
            {
                return NotFound("Results record not found in database, check if ActivityData record of that ID exists");
            }

            foundResults.StepsScore = stepsScore;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultsExists(foundResults.Id))
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

        [HttpPut("calories/{ActivityDataID}")]
        public async Task<IActionResult> PutResultsCalories(int ActivityDataID, int caloriesScore)
        {
            var foundResults = await _context.results.Where(r => r.ActivityDataID == ActivityDataID).FirstOrDefaultAsync();
            if (foundResults == null)
            {
                return NotFound("Results record not found in database, check if ActivityData record of that ID exists");
            }

            foundResults.CaloriesScore = caloriesScore;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultsExists(foundResults.Id))
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

        [HttpPut("nextSteps/{ActivityDataID}")]
        public async Task<IActionResult> PutNextGoal(int ActivityDataID, int nextSteps)
        {
            var foundResults = await _context.results.Where(r => r.ActivityDataID == ActivityDataID).FirstOrDefaultAsync();
            if (foundResults == null)
            {
                return NotFound("Results record not found in database, check if ActivityData record of that ID exists");
            }

            foundResults.nextSteps = nextSteps;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultsExists(foundResults.Id))
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

        [HttpPut("nextCalories/{ActivityDataID}")]
        public async Task<IActionResult> PutNextCalories(int ActivityDataID, int nextCalories)
        {
            var foundResults = await _context.results.Where(r => r.ActivityDataID == ActivityDataID).FirstOrDefaultAsync();
            if (foundResults == null)
            {
                return NotFound("Results record not found in database, check if ActivityData record of that ID exists");
            }

            foundResults.nextCalories = nextCalories;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultsExists(foundResults.Id))
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

        [HttpPut("nextWater/{ActivityDataID}")]
        public async Task<IActionResult> PutNextWater(int ActivityDataID, float nextWater)
        {
            var foundResults = await _context.results.Where(r => r.ActivityDataID == ActivityDataID).FirstOrDefaultAsync();
            if (foundResults == null)
            {
                return NotFound("Results record not found in database, check if ActivityData record of that ID exists");
            }

            foundResults.nextWater = nextWater;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultsExists(foundResults.Id))
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

        [HttpPut("nextSleep/{ActivityDataID}")]
        public async Task<IActionResult> PutNextSleep(int ActivityDataID, int nextSleep)
        {
            var foundResults = await _context.results.Where(r => r.ActivityDataID == ActivityDataID).FirstOrDefaultAsync();
            if (foundResults == null)
            {
                return NotFound("Results record not found in database, check if ActivityData record of that ID exists");
            }

            foundResults.nextSleep = nextSleep;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultsExists(foundResults.Id))
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

        [HttpPut("water/{ActivityDataID}")]
        public async Task<IActionResult> PutResultsWater(int ActivityDataID, int waterScore)
        {
            var foundResults = await _context.results.Where(r => r.ActivityDataID == ActivityDataID).FirstOrDefaultAsync();
            if (foundResults == null)
            {
                return NotFound("Results record not found in database, check if ActivityData record of that ID exists");
            }

            foundResults.WaterScore = waterScore;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultsExists(foundResults.Id))
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

        [HttpPut("sleep/{ActivityDataID}")]
        public async Task<IActionResult> PutResults(int ActivityDataID, int sleepScore)
        {
            var foundResults = await _context.results.Where(r => r.ActivityDataID == ActivityDataID).FirstOrDefaultAsync();
            if (foundResults == null)
            {
                return NotFound("Results record not found in database, check if ActivityData record of that ID exists");
            }

            foundResults.SleepScore = sleepScore;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultsExists(foundResults.Id))
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

        [HttpPut("total/{ActivityDataID}")]
        public async Task<IActionResult> PutResultsTotal(int ActivityDataID, int totalScore)
        {
            var foundResults = await _context.results.Where(r => r.ActivityDataID == ActivityDataID).FirstOrDefaultAsync();
            if (foundResults == null)
            {
                return NotFound("Results record not found in database, check if ActivityData record of that ID exists");
            }

            foundResults.TotalScore = totalScore;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultsExists(foundResults.Id))
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

        [HttpPut("overall/{ActivityDataID}")]
        public async Task<IActionResult> PutResultsOverall(int ActivityDataID, int overallScore)
        {
            var foundResults = await _context.results.Where(r => r.ActivityDataID == ActivityDataID).FirstOrDefaultAsync();
            if (foundResults == null)
            {
                return NotFound("Results record not found in database, check if ActivityData record of that ID exists");
            }

            foundResults.Overall = overallScore;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultsExists(foundResults.Id))
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

        // POST: api/Results
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Models.Results>> PostResults(Models.Results results)
        {
            _context.results.Add(results);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResults", new { id = results.Id }, results);
        }

        // DELETE: api/Results/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResults(int id)
        {
            var results = await _context.results.FindAsync(id);
            if (results == null)
            {
                return NotFound();
            }

            _context.results.Remove(results);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResultsExists(int id)
        {
            return _context.results.Any(e => e.Id == id);
        }
    }
}
