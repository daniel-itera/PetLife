using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetLife.Repositorio.Migrations
{
    /// <inheritdoc />
    public partial class GeneroPet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Genero",
                table: "Pets",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Genero",
                table: "Pets");
        }
    }
}
