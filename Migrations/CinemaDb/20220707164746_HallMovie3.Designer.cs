﻿// <auto-generated />
using System;
using CinemaApp.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CinemaApp.Migrations.CinemaDb
{
    [DbContext(typeof(CinemaDbContext))]
    [Migration("20220707164746_HallMovie3")]
    partial class HallMovie3
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("ActorMovie", b =>
                {
                    b.Property<int>("ActorsId")
                        .HasColumnType("int");

                    b.Property<int>("MoviesId")
                        .HasColumnType("int");

                    b.HasKey("ActorsId", "MoviesId");

                    b.HasIndex("MoviesId");

                    b.ToTable("ActorMovie", (string)null);
                });

            modelBuilder.Entity("CinemaApp.Models.Activity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Act")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Activity", (string)null);
                });

            modelBuilder.Entity("CinemaApp.Models.Actor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Actor", (string)null);
                });

            modelBuilder.Entity("CinemaApp.Models.ComingSoon", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageLink")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TrailerID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ComingSoonMovies", (string)null);
                });

            modelBuilder.Entity("CinemaApp.Models.Director", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Director");
                });

            modelBuilder.Entity("CinemaApp.Models.FeaturedMovies", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.HasKey("Id");

                    b.ToTable("FeaturedMovies", (string)null);
                });

            modelBuilder.Entity("CinemaApp.Models.Hall", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Is3D")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Seats")
                        .HasColumnType("int");

                    b.Property<int>("VIPseats")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Hall", (string)null);
                });

            modelBuilder.Entity("CinemaApp.Models.HallMovie", b =>
                {
                    b.Property<int>("HallId")
                        .HasColumnType("int");

                    b.Property<int>("MovieId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.HasKey("HallId", "MovieId", "Date");

                    b.HasIndex("MovieId");

                    b.ToTable("HallMovie");
                });

            modelBuilder.Entity("CinemaApp.Models.Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("DirectorId")
                        .HasColumnType("int");

                    b.Property<int?>("FeaturedMoviesId")
                        .HasColumnType("int");

                    b.Property<string>("ImageLink")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Rating")
                        .HasColumnType("real");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TrailerID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DirectorId");

                    b.HasIndex("FeaturedMoviesId");

                    b.ToTable("Movie", (string)null);
                });

            modelBuilder.Entity("ActorMovie", b =>
                {
                    b.HasOne("CinemaApp.Models.Actor", null)
                        .WithMany()
                        .HasForeignKey("ActorsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CinemaApp.Models.Movie", null)
                        .WithMany()
                        .HasForeignKey("MoviesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CinemaApp.Models.HallMovie", b =>
                {
                    b.HasOne("CinemaApp.Models.Hall", "Hall")
                        .WithMany("HallMovies")
                        .HasForeignKey("HallId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CinemaApp.Models.Movie", "Movie")
                        .WithMany("HallMovies")
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Hall");

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("CinemaApp.Models.Movie", b =>
                {
                    b.HasOne("CinemaApp.Models.Director", "Director")
                        .WithMany()
                        .HasForeignKey("DirectorId");

                    b.HasOne("CinemaApp.Models.FeaturedMovies", null)
                        .WithMany("Movies")
                        .HasForeignKey("FeaturedMoviesId");

                    b.Navigation("Director");
                });

            modelBuilder.Entity("CinemaApp.Models.FeaturedMovies", b =>
                {
                    b.Navigation("Movies");
                });

            modelBuilder.Entity("CinemaApp.Models.Hall", b =>
                {
                    b.Navigation("HallMovies");
                });

            modelBuilder.Entity("CinemaApp.Models.Movie", b =>
                {
                    b.Navigation("HallMovies");
                });
#pragma warning restore 612, 618
        }
    }
}
