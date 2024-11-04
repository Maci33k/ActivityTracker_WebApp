using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class migrationv151 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_results_Users_UserId",
                table: "results");

            migrationBuilder.DropIndex(
                name: "IX_results_UserId",
                table: "results");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "results",
                newName: "ActivityDataID");

            migrationBuilder.CreateIndex(
                name: "IX_results_ActivityDataID",
                table: "results",
                column: "ActivityDataID",
                unique: true,
                filter: "[ActivityDataID] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_results_ActivityData_ActivityDataID",
                table: "results",
                column: "ActivityDataID",
                principalTable: "ActivityData",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_results_ActivityData_ActivityDataID",
                table: "results");

            migrationBuilder.DropIndex(
                name: "IX_results_ActivityDataID",
                table: "results");

            migrationBuilder.RenameColumn(
                name: "ActivityDataID",
                table: "results",
                newName: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_results_UserId",
                table: "results",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_results_Users_UserId",
                table: "results",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "userID");
        }
    }
}
