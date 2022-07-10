using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CinemaApp.Migrations.CinemaDb
{
    public partial class HallMovie3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_HallMovie",
                table: "HallMovie");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HallMovie",
                table: "HallMovie",
                columns: new[] { "HallId", "MovieId", "Date" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_HallMovie",
                table: "HallMovie");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HallMovie",
                table: "HallMovie",
                columns: new[] { "HallId", "MovieId" });
        }
    }
}
