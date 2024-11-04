using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class migrationv02 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityData_Users_UserID",
                table: "ActivityData");

            migrationBuilder.DropForeignKey(
                name: "FK_Trainings_Users_UserID",
                table: "Trainings");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityData_Users_UserID",
                table: "ActivityData",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "userID");

            migrationBuilder.AddForeignKey(
                name: "FK_Trainings_Users_UserID",
                table: "Trainings",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "userID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityData_Users_UserID",
                table: "ActivityData");

            migrationBuilder.DropForeignKey(
                name: "FK_Trainings_Users_UserID",
                table: "Trainings");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityData_Users_UserID",
                table: "ActivityData",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "userID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Trainings_Users_UserID",
                table: "Trainings",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "userID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
