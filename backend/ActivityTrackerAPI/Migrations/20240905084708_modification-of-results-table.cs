using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class modificationofresultstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "nextCalories",
                table: "results",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "nextSleep",
                table: "results",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "nextSteps",
                table: "results",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "nextWater",
                table: "results",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "nextCalories",
                table: "results");

            migrationBuilder.DropColumn(
                name: "nextSleep",
                table: "results");

            migrationBuilder.DropColumn(
                name: "nextSteps",
                table: "results");

            migrationBuilder.DropColumn(
                name: "nextWater",
                table: "results");
        }
    }
}
