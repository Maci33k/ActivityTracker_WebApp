using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class migrationv13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TrackedActivitiesID",
                table: "userConfigs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TrackedActivities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Steps = table.Column<bool>(type: "bit", nullable: true),
                    Calories = table.Column<bool>(type: "bit", nullable: true),
                    Water = table.Column<bool>(type: "bit", nullable: true),
                    SleepTime = table.Column<bool>(type: "bit", nullable: true),
                    Training = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackedActivities", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_userConfigs_TrackedActivitiesID",
                table: "userConfigs",
                column: "TrackedActivitiesID",
                unique: true,
                filter: "[TrackedActivitiesID] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_userConfigs_TrackedActivities_TrackedActivitiesID",
                table: "userConfigs",
                column: "TrackedActivitiesID",
                principalTable: "TrackedActivities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_userConfigs_TrackedActivities_TrackedActivitiesID",
                table: "userConfigs");

            migrationBuilder.DropTable(
                name: "TrackedActivities");

            migrationBuilder.DropIndex(
                name: "IX_userConfigs_TrackedActivitiesID",
                table: "userConfigs");

            migrationBuilder.DropColumn(
                name: "TrackedActivitiesID",
                table: "userConfigs");
        }
    }
}
