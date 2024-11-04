using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class migrationv12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_userConfigs_userConfigID",
                table: "Users");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_userConfigs_userConfigID",
                table: "Users",
                column: "userConfigID",
                principalTable: "userConfigs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_userConfigs_userConfigID",
                table: "Users");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_userConfigs_userConfigID",
                table: "Users",
                column: "userConfigID",
                principalTable: "userConfigs",
                principalColumn: "Id");
        }
    }
}
