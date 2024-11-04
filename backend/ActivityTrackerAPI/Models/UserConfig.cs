using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ActivityTrackerAPI.Models
{
    public class UserConfig
    {
        [Key]
        public int Id { get; set; }
        public float? Height { get; set; }
        public float? Weight { get; set; }
        public string? Gender { get; set; }
        public string? Fitness { get; set; } // Low, Standard or High
        [JsonIgnore]
        public User? User { get; set; }

        [ForeignKey("TrackedActivities")]
        public int? TrackedActivitiesID { get; set; }

        [JsonIgnore]
        public TrackedActivities? TrackedActivities { get; set; }

    }
}
