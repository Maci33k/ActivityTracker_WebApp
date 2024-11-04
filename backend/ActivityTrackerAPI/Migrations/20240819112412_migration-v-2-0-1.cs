using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class migrationv201 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
           name: "Trainings",
           columns: table => new
           {
               ID = table.Column<int>(type: "int", nullable: false)
                   .Annotation("SqlServer:Identity", "1, 1"),
               UserID = table.Column<int>(type: "int", nullable: true),
               TrainingTime = table.Column<int>(type: "int", nullable: true),
               TrainingType = table.Column<string>(type: "nvarchar(max)", nullable: true),
               AverageHeartRate = table.Column<int>(type: "int", nullable: true)
           },
           constraints: table =>
           {
               table.PrimaryKey("PK_Trainings", x => x.ID);
               table.ForeignKey(
                   name: "FK_Trainings_Users_UserID",
                   column: x => x.UserID,
                   principalTable: "Users",
                   principalColumn: "userID",
                   onDelete: ReferentialAction.Restrict);
           });

            migrationBuilder.CreateIndex(
                name: "IX_Trainings_UserID",
                table: "Trainings",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
            name: "Trainings");
        }
    }
}
