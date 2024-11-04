using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class migrationv212 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TrainingData",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActivityDataID = table.Column<int>(type: "int", nullable: false),
                    TrainingTime = table.Column<int>(type: "int", nullable: false),
                    TrainingType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AverageHeartRate = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingData", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TrainingData_ActivityData_ActivityDataID",
                        column: x => x.ActivityDataID,
                        principalTable: "ActivityData",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrainingData_ActivityDataID",
                table: "TrainingData",
                column: "ActivityDataID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrainingData");
        }
    }
}
