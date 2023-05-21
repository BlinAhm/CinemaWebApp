using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CinemaApp.Migrations
{
    public partial class AdminData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //insert Admin data
            migrationBuilder.Sql("INSERT INTO [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [FirstName], [LastName]) VALUES (N'c53cf74a-d13a-4bae-a7e3-e01e7b6f68a3', N'blin@email.com', N'BLIN@EMAIL.COM', N'blin@email.com', N'BLIN@EMAIL.COM', 0, N'AQAAAAEAACcQAAAAEBu1fGz4guRW7+lfu5eo+pu3VnWeaNDeHBo+IZFyWlV4bYsgKFcQGdc/ZWXP/zSFxw==', N'BWZME4VWJRXC3GYAAFANHKV4CUKXKR6T', N'6d32761c-4de4-4339-8cd8-8b705ae178c9', NULL, 0, 0, NULL, 1, 0, N'blin', N'ahmeti')");
            migrationBuilder.Sql("INSERT INTO[dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES(N'c53cf74a-d13a-4bae-a7e3-e01e7b6f68a3', N'235b2b2c-d228-4db6-bbed-c9c9cca2591f')");
            migrationBuilder.Sql("INSERT INTO[dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES(N'c53cf74a-d13a-4bae-a7e3-e01e7b6f68a3', N'c90b56ca-9bd0-4d45-83a5-89839cc03b21')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
