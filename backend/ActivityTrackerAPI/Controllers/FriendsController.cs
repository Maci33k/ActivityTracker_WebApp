using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ActivityTrackerAPI;
using ActivityTrackerAPI.Models;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.OpenApi.Any;

namespace ActivityTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FriendsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Friends
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Friends>>> GetFriends()
        {
            return await _context.Friends.ToListAsync();
        }

        // GET: api/Friends/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Friends>> GetFriends(int id)
        {
            var friends = await _context.Friends.FindAsync(id);

            if (friends == null)
            {
                return NotFound();
            }

            return friends;
        }

        // GET: api/Friends/requests/5
        [HttpGet("requests/{userID}")]
        public async Task<ActionResult<int>> GetNumberOfNotifications(int userID)
        {
            var numberOfNotifications = await _context.Friends.Where(f => f.Friend2ID == userID && f.Status == "pending").CountAsync();
            return Ok(numberOfNotifications);
        }

        // GET: api/Friends/requested-friend/5
        [HttpGet("requested-friend/{userID}")]
        public async Task<ActionResult<User>> GetRequestedFriend(int userID)
        {
            var invitation = await _context.Friends.Where(f => f.Friend2ID == userID && f.Status == "pending").FirstAsync();
            if(invitation == null)
            {
                return NotFound("Could't find invitation record");
            }
            var friend = await _context.Users.Where(u => u.userID == invitation.Friend1ID).FirstOrDefaultAsync();
            if (friend == null) 
            {
                return NotFound("No friend found");
            }
            var result = new
            {
                friend.userID,
                friend.username,
                friend.name,
                friend.surname,
                friend.age,
                friend.city,
                friend.Image,
                invitation.ID
        };
            return Ok(result);

        }

        [HttpGet("{UserID}/Friends")]
        public async Task<ActionResult<IEnumerable<User>>> GetUserFriends(int UserID)
        {
            var friends = await _context.Friends
                .Where(f => (f.Friend1ID == UserID && f.Status == "accepted") ||
                            (f.Friend2ID == UserID && f.Status == "accepted"))
                .ToListAsync();

            if (!friends.Any()) 
            {
                return NotFound();
            }

            var IDList = friends.Select(f => f.Friend1ID == UserID ? f.Friend2ID : f.Friend1ID).ToList();

            var Users = await _context.Users
                .Where(u => IDList.Contains(u.userID))
                .ToListAsync();

            return Ok(Users);
        }

        [HttpGet("{UserID}/profile")]
        public async Task<ActionResult<IEnumerable<AnyType>>> GetFriendProfile(int UserID)
        {
            var user = await _context.Users.FindAsync(UserID);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var LastActivityRecord = await _context.ActivityData.Where(a => a.UserID == UserID).OrderByDescending(a => a.Date).FirstOrDefaultAsync();
            if(LastActivityRecord == null)
            {
                return NotFound("Last activity record not found");
            }
            DateTime today = DateTime.Today;
            int daysSinceLastMonday = (int)today.DayOfWeek - (int)DayOfWeek.Monday;
            if (daysSinceLastMonday < 0)
            {
                daysSinceLastMonday = 6;
            }
            DateTime lastMonday = today.AddDays(-daysSinceLastMonday);
            var ActivityRecordsOfThisWeek = await _context.ActivityData
           .Where(a => a.Date >= lastMonday) 
           .ToListAsync();
            var LastTraining = await _context.TrainingData.Where(t => t.ActivityDataID == LastActivityRecord.ID).FirstOrDefaultAsync();
            var activityDataIDs = ActivityRecordsOfThisWeek.Select(a => a.ID).ToList();
            var TrainingRecordsOfThisWeek = await _context.TrainingData
                .Where(t => activityDataIDs.Contains(t.ActivityDataID))
                .ToListAsync();
            var level = await _context.UserLevels.Where(l => l.UserID == UserID).FirstOrDefaultAsync();
            var friendAchievements = await _context.Achievements.Where(a => a.UserID == UserID).FirstOrDefaultAsync();
            var FriendProfileData = new
            {
                username = user?.username,
                image = user?.Image,
                name = user?.name,
                surname = user?.surname,
                city = user?.city,

                lastSteps = LastActivityRecord?.Steps,
                lastCalories = LastActivityRecord?.Calories,
                lastWater = LastActivityRecord?.Water,
                lastSleepTime = LastActivityRecord?.SleepTime,
                activityDate = LastActivityRecord?.Date,


                weeklyAverageSteps = ActivityRecordsOfThisWeek?.Where(a => a.Steps.HasValue).Any() == true
                ? (int)Math.Round(ActivityRecordsOfThisWeek.Where(a => a.Steps.HasValue).Average(a => a.Steps.Value))
                : 0,

                weeklyAverageCalories = ActivityRecordsOfThisWeek?.Where(a => a.Calories.HasValue).Any() == true
                ? (int)Math.Round(ActivityRecordsOfThisWeek.Where(a => a.Calories.HasValue).Average(a => a.Calories.Value))
                : 0,

                weeklyAverageWater = ActivityRecordsOfThisWeek?.Where(a => a.Water.HasValue).Any() == true
                ? (ActivityRecordsOfThisWeek.Where(a => a.Water.HasValue).Average(a => a.Water.Value))
                : 0,

                weeklyAverageSleepTime = ActivityRecordsOfThisWeek?.Where(a => a.SleepTime.HasValue).Any() == true
                ? (int)Math.Round(ActivityRecordsOfThisWeek.Where(a => a.SleepTime.HasValue).Average(a => a.SleepTime.Value))
                : 0,


                lastTrainingTime = LastTraining?.TrainingTime,
                lastTrainingType = LastTraining?.TrainingType,
                lastTrainingHeartRate = LastTraining?.AverageHeartRate,

                weeklyAverageTrainingTime = TrainingRecordsOfThisWeek?.Where(t => t.TrainingTime.HasValue).Any() == true
                ? (int)Math.Round(TrainingRecordsOfThisWeek.Where(t => t.TrainingTime.HasValue).Average(t => t.TrainingTime.Value))
                : 0,

                weeklyAverageHeartRate = TrainingRecordsOfThisWeek?.Where(t => t.AverageHeartRate.HasValue).Any() == true
                ? (int)Math.Round(TrainingRecordsOfThisWeek.Where(t => t.AverageHeartRate.HasValue).Average(t => t.AverageHeartRate.Value))
                : 0,


                experience = level?.Experience,
                nextLevelExperience = level?.NextLevelExperience,
                level = level?.Level,

                achievement1 = friendAchievements?.PinnedAchievement1,
                achievement2 = friendAchievements?.PinnedAchievement2,
                achievement3 = friendAchievements?.PinnedAchievement3
            };
            return Ok(FriendProfileData);

        }

        // PUT: api/Friends/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFriends(int id, Friends friends)
        {
            if (id != friends.ID)
            {
                return BadRequest();
            }

            _context.Entry(friends).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FriendsExists(id))
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

        // PUT: api/Friends/status/5
        [HttpPut("status/{id}")]
        public async Task<IActionResult> PutStatus(int id, string status)
        {
            var invitation = await _context.Friends.FindAsync(id);
            if (invitation == null)
            {
                return NotFound();
            }
            invitation.Status = status;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/Friends
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Friends>> PostFriends(Friends friends)
        {
            _context.Friends.Add(friends);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFriends", new { id = friends.ID }, friends);
        }

        // DELETE: api/Friends/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFriends(int id)
        {
            var friends = await _context.Friends.FindAsync(id);
            if (friends == null)
            {
                return NotFound();
            }

            _context.Friends.Remove(friends);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Friends/userID
        [HttpDelete("user/{userID}")]
        public async Task<IActionResult> DeleteFriend(int userID)
        {
            var friend = await _context.Friends.Where(f => f.Friend1ID == userID || f.Friend2ID == userID).FirstOrDefaultAsync();
            if (friend == null)
            {
                return NotFound();
            }

            _context.Friends.Remove(friend);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FriendsExists(int id)
        {
            return _context.Friends.Any(e => e.ID == id);
        }
    }
}
