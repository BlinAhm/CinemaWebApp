using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CinemaApp.Migrations.CinemaDb
{
    public partial class DbSetHallMovies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_HallMovie_HallMovieHallId_HallMovieMovieId_HallMovieDate",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_HallMovie_Hall_HallId",
                table: "HallMovie");

            migrationBuilder.DropForeignKey(
                name: "FK_HallMovie_Movie_MovieId",
                table: "HallMovie");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HallMovie",
                table: "HallMovie");

            migrationBuilder.RenameTable(
                name: "HallMovie",
                newName: "HallMovies");

            migrationBuilder.RenameIndex(
                name: "IX_HallMovie_MovieId",
                table: "HallMovies",
                newName: "IX_HallMovies_MovieId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HallMovies",
                table: "HallMovies",
                columns: new[] { "HallId", "MovieId", "Date" });

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_HallMovies_HallMovieHallId_HallMovieMovieId_HallMovieDate",
                table: "Bookings",
                columns: new[] { "HallMovieHallId", "HallMovieMovieId", "HallMovieDate" },
                principalTable: "HallMovies",
                principalColumns: new[] { "HallId", "MovieId", "Date" });

            migrationBuilder.AddForeignKey(
                name: "FK_HallMovies_Hall_HallId",
                table: "HallMovies",
                column: "HallId",
                principalTable: "Hall",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HallMovies_Movie_MovieId",
                table: "HallMovies",
                column: "MovieId",
                principalTable: "Movie",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_HallMovies_HallMovieHallId_HallMovieMovieId_HallMovieDate",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_HallMovies_Hall_HallId",
                table: "HallMovies");

            migrationBuilder.DropForeignKey(
                name: "FK_HallMovies_Movie_MovieId",
                table: "HallMovies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HallMovies",
                table: "HallMovies");

            migrationBuilder.RenameTable(
                name: "HallMovies",
                newName: "HallMovie");

            migrationBuilder.RenameIndex(
                name: "IX_HallMovies_MovieId",
                table: "HallMovie",
                newName: "IX_HallMovie_MovieId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HallMovie",
                table: "HallMovie",
                columns: new[] { "HallId", "MovieId", "Date" });

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_HallMovie_HallMovieHallId_HallMovieMovieId_HallMovieDate",
                table: "Bookings",
                columns: new[] { "HallMovieHallId", "HallMovieMovieId", "HallMovieDate" },
                principalTable: "HallMovie",
                principalColumns: new[] { "HallId", "MovieId", "Date" });

            migrationBuilder.AddForeignKey(
                name: "FK_HallMovie_Hall_HallId",
                table: "HallMovie",
                column: "HallId",
                principalTable: "Hall",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HallMovie_Movie_MovieId",
                table: "HallMovie",
                column: "MovieId",
                principalTable: "Movie",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
