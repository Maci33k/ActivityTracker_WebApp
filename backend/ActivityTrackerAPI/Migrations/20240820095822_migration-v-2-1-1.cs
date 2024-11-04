using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class migrationv211 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrainingActivity");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TrainingActivity",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActivityDataID = table.Column<int>(type: "int", nullable: true),
                    AverageHeartRate = table.Column<int>(type: "int", nullable: true),
                    TrainingTime = table.Column<int>(type: "int", nullable: true),
                    TrainingType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    userID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingActivity", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TrainingActivity_ActivityData_ActivityDataID",
                        column: x => x.ActivityDataID,
                        principalTable: "ActivityData",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_TrainingActivity_Users_userID",
                        column: x => x.userID,
                        principalTable: "Users",
                        principalColumn: "userID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrainingActivity_ActivityDataID",
                table: "TrainingActivity",
                column: "ActivityDataID",
                unique: true,
                filter: "[ActivityDataID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingActivity_userID",
                table: "TrainingActivity",
                column: "userID");
        }
    }
}
