using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CinemaApp.Migrations.CinemaDb
{
    public partial class Bookings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    SeatId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    HallMovieDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    HallMovieHallId = table.Column<int>(type: "int", nullable: true),
                    HallMovieMovieId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => new { x.SeatId, x.UserId });
                    table.ForeignKey(
                        name: "FK_Bookings_HallMovie_HallMovieHallId_HallMovieMovieId_HallMovieDate",
                        columns: x => new { x.HallMovieHallId, x.HallMovieMovieId, x.HallMovieDate },
                        principalTable: "HallMovie",
                        principalColumns: new[] { "HallId", "MovieId", "Date" });
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_HallMovieHallId_HallMovieMovieId_HallMovieDate",
                table: "Bookings",
                columns: new[] { "HallMovieHallId", "HallMovieMovieId", "HallMovieDate" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bookings");
        }
    }
}
