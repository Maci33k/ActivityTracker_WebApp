using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class migrationv15 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "results",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    StepsScore = table.Column<int>(type: "int", nullable: true),
                    CaloriesScore = table.Column<int>(type: "int", nullable: true),
                    WaterScore = table.Column<int>(type: "int", nullable: true),
                    SleepScore = table.Column<int>(type: "int", nullable: true),
                    TotalScore = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_results", x => x.Id);
                    table.ForeignKey(
                        name: "FK_results_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "userID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_results_UserId",
                table: "results",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "results");
        }
    }
}
