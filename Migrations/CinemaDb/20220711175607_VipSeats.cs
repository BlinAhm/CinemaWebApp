using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CinemaApp.Migrations.CinemaDb
{
    public partial class VipSeats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VipSeats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Seats = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HallMovieDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    HallMovieHallId = table.Column<int>(type: "int", nullable: true),
                    HallMovieMovieId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VipSeats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VipSeats_HallMovies_HallMovieHallId_HallMovieMovieId_HallMovieDate",
                        columns: x => new { x.HallMovieHallId, x.HallMovieMovieId, x.HallMovieDate },
                        principalTable: "HallMovies",
                        principalColumns: new[] { "HallId", "MovieId", "Date" });
                });

            migrationBuilder.CreateIndex(
                name: "IX_VipSeats_HallMovieHallId_HallMovieMovieId_HallMovieDate",
                table: "VipSeats",
                columns: new[] { "HallMovieHallId", "HallMovieMovieId", "HallMovieDate" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VipSeats");
        }
    }
}
