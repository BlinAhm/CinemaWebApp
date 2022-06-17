using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CinemaApp.Migrations.CinemaDb
{
    public partial class FeaturedMovies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FeaturedMoviesId",
                table: "Movie",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FeaturedMovies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeaturedMovies", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Movie_FeaturedMoviesId",
                table: "Movie",
                column: "FeaturedMoviesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Movie_FeaturedMovies_FeaturedMoviesId",
                table: "Movie",
                column: "FeaturedMoviesId",
                principalTable: "FeaturedMovies",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movie_FeaturedMovies_FeaturedMoviesId",
                table: "Movie");

            migrationBuilder.DropTable(
                name: "FeaturedMovies");

            migrationBuilder.DropIndex(
                name: "IX_Movie_FeaturedMoviesId",
                table: "Movie");

            migrationBuilder.DropColumn(
                name: "FeaturedMoviesId",
                table: "Movie");
        }
    }
}
