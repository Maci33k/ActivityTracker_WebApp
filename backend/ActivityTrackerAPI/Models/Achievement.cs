using System.Text.Json.Serialization;

namespace ActivityTrackerAPI.Models
{
    public class Achievement
    {
        public int ID { get; set; }
        public int? UserID { get; set; }
        public bool? LevelAchievement1 { get; set; }
        public bool? LevelAchievement2 { get; set; }
        public bool? LevelAchievement3 { get; set; }
        public bool? ActivityAchievement1 { get; set; }
        public bool? ActivityAchievement2 { get; set; }
        public bool? ActivityAchievement3 { get; set; }
        public string? PinnedAchievement1 { get; set; }
        public string? PinnedAchievement2 { get; set; }
        public string? PinnedAchievement3 { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
    }
}
