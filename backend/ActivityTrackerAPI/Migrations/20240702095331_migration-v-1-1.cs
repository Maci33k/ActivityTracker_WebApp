using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActivityTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class migrationv11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "userConfigID",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "userConfigs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Height = table.Column<float>(type: "real", nullable: true),
                    Weight = table.Column<float>(type: "real", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fitness = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userConfigs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_userConfigID",
                table: "Users",
                column: "userConfigID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_userConfigs_userConfigID",
                table: "Users",
                column: "userConfigID",
                principalTable: "userConfigs",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_userConfigs_userConfigID",
                table: "Users");

            migrationBuilder.DropTable(
                name: "userConfigs");

            migrationBuilder.DropIndex(
                name: "IX_Users_userConfigID",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "userConfigID",
                table: "Users");
        }
    }
}
