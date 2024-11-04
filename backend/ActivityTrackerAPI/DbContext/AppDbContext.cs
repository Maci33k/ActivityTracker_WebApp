using ActivityTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ActivityTrackerAPI
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<ActivityData> ActivityData { get; set; }
        public DbSet<UserConfig> userConfigs { get; set; }
        public DbSet<TrackedActivities> TrackedActivities { get; set; }
        public DbSet<Goals> goals { get; set; }
        public DbSet<Models.Results> results { get; set; }
        public DbSet<UserLevel> UserLevels { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        public DbSet<TrainingData> TrainingData { get; set; }

        public DbSet<Friends> Friends { get; set; }
        public DbSet<Achievement> Achievements { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<ActivityData>()
                .HasOne(a => a.User)
                .WithMany(u => u.ActivityData)
                .HasForeignKey(a => a.UserID)
                .IsRequired(false);

            modelBuilder.Entity<TrainingData>()
                .HasOne(t => t.ActivityData)
                .WithOne(a => a.TrainingData)
                .HasForeignKey<TrainingData>(t => t.ActivityDataID);

            modelBuilder.Entity<User>()
                .HasOne(u => u.UserConfig)
                .WithOne(uc => uc.User)
                .HasForeignKey<User>(u => u.userConfigID);

            modelBuilder.Entity<UserConfig>()
                .HasOne(a => a.TrackedActivities)
                .WithOne(u => u.UserConfig)
                .HasForeignKey<UserConfig>(t => t.TrackedActivitiesID);

            modelBuilder.Entity<Goals>()
                .HasOne(g => g.User)
                .WithOne(u => u.Goals)
                .HasForeignKey<Goals>(g => g.UserID);

            modelBuilder.Entity<Models.Results>()
                .HasOne(r => r.ActivityData)
                .WithOne(u => u.Results)
                .HasForeignKey<Models.Results>(r => r.ActivityDataID);

            modelBuilder.Entity<UserLevel>()
                .HasOne(l => l.User)
                .WithOne(u => u.UserLevel)
                .HasForeignKey<UserLevel>(l => l.UserID);

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.Results)
                .WithMany(r => r.Notifications)
                .HasForeignKey(n => n.ResultsID);
            modelBuilder.Entity<Achievement>()
                .HasOne(a => a.User)
                .WithOne(u => u.Achievement)
                .HasForeignKey<Achievement>(a => a.UserID);
        }
        public DbSet<ActivityTrackerAPI.Models.Goals> Goals { get; set; } = default!;
    }
}
