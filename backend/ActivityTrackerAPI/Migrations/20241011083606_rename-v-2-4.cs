using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class renamev24 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LevelAchievement6",
                table: "Achievements",
                newName: "ActivityAchievement3");

            migrationBuilder.RenameColumn(
                name: "LevelAchievement5",
                table: "Achievements",
                newName: "ActivityAchievement2");

            migrationBuilder.RenameColumn(
                name: "LevelAchievement4",
                table: "Achievements",
                newName: "ActivityAchievement1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ActivityAchievement3",
                table: "Achievements",
                newName: "LevelAchievement6");

            migrationBuilder.RenameColumn(
                name: "ActivityAchievement2",
                table: "Achievements",
                newName: "LevelAchievement5");

            migrationBuilder.RenameColumn(
                name: "ActivityAchievement1",
                table: "Achievements",
                newName: "LevelAchievement4");
        }
    }
}
