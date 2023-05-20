using CinemaApp.Models;
using Microsoft.EntityFrameworkCore.Migrations;
using System.Collections.Generic;

#nullable disable

namespace CinemaApp.Migrations.CinemaDb
{
    public partial class InsertData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //insert Director data
            migrationBuilder.Sql("SET IDENTITY_INSERT[dbo].[Director] ON");
            migrationBuilder.Sql("INSERT INTO[dbo].[Director]([Id], [FirstName], [LastName]) VALUES(1, N'Chad', N'Stahelski')");
            migrationBuilder.Sql("SET IDENTITY_INSERT[dbo].[Director] OFF");

            //insert Movie data
            migrationBuilder.Sql("SET IDENTITY_INSERT[dbo].[Movie] ON");
            migrationBuilder.Sql("INSERT INTO[dbo].[Movie]([Id], [ImageLink], [Title], [Description], [Rating], [Category], [FeaturedMoviesId], [TrailerID], [DirectorId], [Duration], [Price]) VALUES(1, N'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS33DWHodvlDR_SOCQyYyqrb9Td8hvufc3zYCnnAD4PkBX4W7dF', N'John Wick: Chapter 4', N'With the price on his head ever increasing, legendary hit man John Wick takes his fight against the High Table global as he seeks out the most powerful players in the underworld, from New York to Paris to Japan to Berlin.', 8.2, N'Action', NULL, N'yjRHZEUamCc', 1, 2, 3)\r\n");
            migrationBuilder.Sql("SET IDENTITY_INSERT[dbo].[Movie] OFF");
            
            //insert Hall data
            migrationBuilder.Sql("SET IDENTITY_INSERT[dbo].[Hall] ON");
            migrationBuilder.Sql("INSERT INTO[dbo].[Hall]([Id], [Name], [Seats], [Is3D]) VALUES(1, N'Salla1', 30, 0)");
            migrationBuilder.Sql("SET IDENTITY_INSERT[dbo].[Hall] OFF");
            
            //insert HallMovie data
            migrationBuilder.Sql("INSERT INTO [dbo].[HallMovies] ([HallId], [MovieId], [Date]) VALUES (1, 1, N'2023-05-20 00:00:00')");

            //insert Actor data
            migrationBuilder.Sql("SET IDENTITY_INSERT[dbo].[Actor] ON");
            migrationBuilder.Sql("INSERT INTO[dbo].[Actor]([Id], [FirstName], [LastName]) VALUES(1, N'Keanu', N'Reeves')");
            migrationBuilder.Sql("SET IDENTITY_INSERT[dbo].[Actor] OFF");

            //insert ActorMovie data
            migrationBuilder.Sql("INSERT INTO [dbo].[ActorMovie] ([ActorsId], [MoviesId]) VALUES (1, 1)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
