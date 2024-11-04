using System.Text.Json.Serialization;

namespace ActivityTrackerAPI.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public int UserID { get; set; }

        public int ResultsID { get; set; }
        public string NotificationTitle { get; set; }
        public string Advice { get; set; }

        public string ActivityType { get; set; }
        [JsonIgnore]
        public Results? Results { get; set; }    
    }
}
