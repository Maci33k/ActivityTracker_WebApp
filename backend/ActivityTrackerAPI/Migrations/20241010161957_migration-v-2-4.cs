using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class migrationv24 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Achievements",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: true),
                    LevelAchievement1 = table.Column<bool>(type: "bit", nullable: true),
                    LevelAchievement2 = table.Column<bool>(type: "bit", nullable: true),
                    LevelAchievement3 = table.Column<bool>(type: "bit", nullable: true),
                    LevelAchievement4 = table.Column<bool>(type: "bit", nullable: true),
                    LevelAchievement5 = table.Column<bool>(type: "bit", nullable: true),
                    LevelAchievement6 = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Achievements", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Achievements_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "userID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Achievements_UserID",
                table: "Achievements",
                column: "UserID",
                unique: true,
                filter: "[UserID] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Achievements");
        }
    }
}
