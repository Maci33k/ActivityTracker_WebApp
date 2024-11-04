using System.Text.Json.Serialization;

namespace ActivityTrackerAPI.Models
{
    public class TrackedActivities
    {
        public int Id { get; set; }
        public bool? Steps { get; set; }

        public bool? Calories { get; set; }

        public bool? Water { get; set; }

        public bool? SleepTime { get; set; }

        public bool? Training { get; set; }

        [JsonIgnore]
        public UserConfig? UserConfig { get; set; }

    }
}
