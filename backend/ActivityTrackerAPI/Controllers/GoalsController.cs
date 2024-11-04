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
    public class GoalsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GoalsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Goals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Goals>>> GetGoals()
        {
            return await _context.Goals.ToListAsync();
        }

        // GET: api/Goals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Goals>> GetGoals(int id)
        {
            var goals = await _context.Goals.FindAsync(id);

            if (goals == null)
            {
                return NotFound();
            }

            return goals;
        }

        // GET: api/Goals/user-id/5
        [HttpGet("user-id/{id}")]
        public async Task<ActionResult<Goals>> GetGoalsByUserId(int id)
        {
            var goals = await _context.goals.Where(g => g.UserID == id).FirstOrDefaultAsync();

            if(goals == null)
            {
                return NotFound("Record of that user id not found in data base");
            }
            return goals;
        }

        // PUT: api/Goals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("steps/user-id/{id}")]
        public async Task<IActionResult> UpdateStepsGoal(int id, int steps)
        {
            var existedGoals = await _context.Goals.Where(g => g.UserID == id).FirstOrDefaultAsync();

            if (existedGoals == null)
            {
                return NotFound("Goals of that user not found in database");
            }

            existedGoals.Steps = steps;

            
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GoalsExists(id))
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

        [HttpPut("calories/user-id/{id}")]
        public async Task<IActionResult> UpdateCaloriesGoal(int id, int calories)
        {
            var existedGoals = await _context.Goals.Where(g => g.UserID == id).FirstOrDefaultAsync();

            if (existedGoals == null)
            {
                return NotFound("Goals of that user not found in database");
            }

            existedGoals.Calories = calories;



            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GoalsExists(id))
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

        [HttpPut("water/user-id/{id}")]
        public async Task<IActionResult> UpdateWaterGoal(int id, float water)
        {
            var existedGoals = await _context.Goals.Where(g => g.UserID == id).FirstOrDefaultAsync();

            if (existedGoals == null)
            {
                return NotFound("Goals of that user not found in database");
            }

            existedGoals.Water = water;



            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GoalsExists(id))
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

        // POST: api/Goals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Goals>> PostGoals(Goals goals)
        {
            _context.Goals.Add(goals);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGoals", new { id = goals.Id }, goals);
        }

        // DELETE: api/Goals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGoals(int id)
        {
            var goals = await _context.Goals.FindAsync(id);
            if (goals == null)
            {
                return NotFound();
            }

            _context.Goals.Remove(goals);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GoalsExists(int id)
        {
            return _context.Goals.Any(e => e.Id == id);
        }
    }
}
