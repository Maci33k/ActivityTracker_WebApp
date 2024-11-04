using Microsoft.AspNetCore.Razor.Language.Intermediate;
using System.Text.Json.Serialization;

namespace ActivityTrackerAPI.Models
{
    public class Results
    {
        public int Id { get; set; }
        public int? ActivityDataID { get; set; }
        public int? UserID { get; set; }
        public int? StepsScore { get; set; }
        public int? CaloriesScore { get; set; }
        public int? WaterScore { get; set; }
        public int? SleepScore { get; set; }
        public int? TotalScore { get; set; }
        public int? nextSteps { get; set; }
        public float? nextWater { get; set; }
        public int? nextCalories { get; set; }
        public int? nextSleep { get; set; }
        public int? Overall { get; set; }
        [JsonIgnore]
        public ActivityData? ActivityData { get; set; }

        [JsonIgnore]
        public ICollection<Notification>? Notifications { get; set; }
    }
}
