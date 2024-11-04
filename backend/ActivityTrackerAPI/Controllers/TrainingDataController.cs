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
    public class TrainingDataController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TrainingDataController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/TrainingData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrainingData>>> GetTrainingData()
        {
            return await _context.TrainingData.ToListAsync();
        }

        // GET: api/TrainingData/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TrainingData>> GetTrainingData(int id)
        {
            var trainingData = await _context.TrainingData.FindAsync(id);

            if (trainingData == null)
            {
                return NotFound();
            }

            return trainingData;
        }

        //Get: api/TrainingData/ActivityData/5
        [HttpGet("ActivityData/{ActivityDataID}")]
        public async Task<ActionResult<TrainingData>> GetTrainingDataByActivityRecord(int ActivityDataID)
        {
            var trainingData = await _context.TrainingData.Where(t => t.ActivityDataID == ActivityDataID).ToListAsync();
            if(trainingData == null)
            {
                return NotFound();
            }
            return Ok(trainingData);
        }

        // PUT: api/TrainingData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrainingData(int id, TrainingData trainingData)
        {
            if (id != trainingData.ID)
            {
                return BadRequest();
            }

            _context.Entry(trainingData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainingDataExists(id))
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

        [HttpPut("score/ActivityData/{ActivityDataID}")]
        public async Task<IActionResult> PutTrainingScore(int ActivityDataID, int score)
        {
            var training = await _context.TrainingData.Where(t => t.ActivityDataID == ActivityDataID).FirstOrDefaultAsync();
            if (training == null)
            {
                return NotFound("Training record not found in database, check if Training record of that ID exists");
            }

            training.TrainingScore = score;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainingDataExists(training.ID))
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

        // POST: api/TrainingData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TrainingData>> PostTrainingData(TrainingData trainingData)
        {
            _context.TrainingData.Add(trainingData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTrainingData", new { id = trainingData.ID }, trainingData);
        }

        // DELETE: api/TrainingData/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrainingData(int id)
        {
            var trainingData = await _context.TrainingData.FindAsync(id);
            if (trainingData == null)
            {
                return NotFound();
            }

            _context.TrainingData.Remove(trainingData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TrainingDataExists(int id)
        {
            return _context.TrainingData.Any(e => e.ID == id);
        }
    }
}
