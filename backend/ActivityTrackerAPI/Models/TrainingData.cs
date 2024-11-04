using System.Text.Json.Serialization;

namespace ActivityTrackerAPI.Models
{
    public class TrainingData
    {
        public int ID { get; set; }
        public int ActivityDataID { get; set; }
        public int? TrainingTime { get; set; }
        public string? TrainingType { get; set; }
        public int? AverageHeartRate { get; set; }
        public int? TrainingScore { get; set; }

        [JsonIgnore]
        public ActivityData? ActivityData { get; set; }
    }
}
