namespace ActivityTrackerAPI.Models
{
    public class Friends
    {
        public int ID { get; set; }
        public int? Friend1ID { get; set; } // Friend that requested
        public int? Friend2ID { get; set; } // Friend that receives
        public string Status { get; set; } // pending or accepted
    }
}
