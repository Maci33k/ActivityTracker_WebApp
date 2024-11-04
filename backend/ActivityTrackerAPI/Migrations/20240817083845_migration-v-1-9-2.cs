using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class migrationv192 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Notifications_ResultsID",
                table: "Notifications");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ResultsID",
                table: "Notifications",
                column: "ResultsID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Notifications_ResultsID",
                table: "Notifications");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ResultsID",
                table: "Notifications",
                column: "ResultsID",
                unique: true);
        }
    }
}
