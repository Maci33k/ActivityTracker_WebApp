using System.Text.Json.Serialization;

namespace ActivityTrackerAPI.Models
{
    public class UserLevel
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public int Experience { get; set; }
        public int TotalExperience { get; set; }
        public int NextLevelExperience { get; set; }
        public int Level { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
    }
}
