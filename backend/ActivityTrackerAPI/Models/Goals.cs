using System.Text.Json.Serialization;

namespace ActivityTrackerAPI.Models
{
    public class Goals
    {
        public int Id { get; set; }
        public int? UserID { get; set; }
        public int? Calories { get; set; }
        public int? Steps { get; set; }
        public float? Water { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
    }
}
