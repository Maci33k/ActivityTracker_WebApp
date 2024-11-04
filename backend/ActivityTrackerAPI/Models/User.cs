using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ActivityTrackerAPI.Models
{
    public class User
    {
        [Key]
        public int userID { get; set; }
        public int userConfigID { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string password { get; set; }

        [Required]
        public string name { get; set; }
        [Required]
        public string surname { get; set; }
        [Required]
        public string gender { get; set; }
        [Required]
        public int age { get; set; }
        [Required]
        public string city { get; set; }
        public byte[]? Image { get; set; } 
        public bool isVerified { get; set; }

        [Required]
        public string VerificationToken { get; set; }

        [JsonIgnore]
        public ICollection<ActivityData>? ActivityData { get; set; }
        [JsonIgnore]
        public UserConfig? UserConfig { get; set; }
        [JsonIgnore]
        public Goals? Goals { get; set; }

        public UserLevel? UserLevel { get; set; }
        public Achievement? Achievement { get; set; }

    }
}
