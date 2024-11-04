using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class migrationv171 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLevel_Users_UserID",
                table: "UserLevel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserLevel",
                table: "UserLevel");

            migrationBuilder.RenameTable(
                name: "UserLevel",
                newName: "UserLevels");

            migrationBuilder.RenameIndex(
                name: "IX_UserLevel_UserID",
                table: "UserLevels",
                newName: "IX_UserLevels_UserID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserLevels",
                table: "UserLevels",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserLevels_Users_UserID",
                table: "UserLevels",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "userID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLevels_Users_UserID",
                table: "UserLevels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserLevels",
                table: "UserLevels");

            migrationBuilder.RenameTable(
                name: "UserLevels",
                newName: "UserLevel");

            migrationBuilder.RenameIndex(
                name: "IX_UserLevels_UserID",
                table: "UserLevel",
                newName: "IX_UserLevel_UserID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserLevel",
                table: "UserLevel",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserLevel_Users_UserID",
                table: "UserLevel",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "userID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
