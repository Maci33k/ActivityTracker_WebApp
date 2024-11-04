using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class migrationv06 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "verificationToken",
                table: "Users",
                newName: "VerificationToken");

            migrationBuilder.AddColumn<int>(
                name: "SleepTime",
                table: "ActivityData",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SleepTime",
                table: "ActivityData");

            migrationBuilder.RenameColumn(
                name: "VerificationToken",
                table: "Users",
                newName: "verificationToken");
        }
    }
}
