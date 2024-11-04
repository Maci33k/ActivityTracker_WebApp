using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class addtrainingtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Tworzenie tabeli 'TrainingActivity'
            migrationBuilder.CreateTable(
                name: "TrainingActivity",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActivityDataID = table.Column<int>(type: "int", nullable: true),
                    TrainingTime = table.Column<int>(type: "int", nullable: true),
                    TrainingType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AverageHeartRate = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingActivity", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TrainingActivity_ActivityData_ActivityDataID",
                        column: x => x.ActivityDataID,
                        principalTable: "ActivityData",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            // Tworzenie indeksu na kolumnie 'ActivityDataID'
            migrationBuilder.CreateIndex(
                name: "IX_TrainingActivity_ActivityDataID",
                table: "TrainingActivity",
                column: "ActivityDataID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Usunięcie tabeli 'TrainingActivity'
            migrationBuilder.DropTable(
                name: "TrainingActivity");
        }
    }
}
