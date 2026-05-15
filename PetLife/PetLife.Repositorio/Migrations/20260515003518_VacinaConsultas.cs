using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetLife.Repositorio.Migrations
{
    /// <inheritdoc />
    public partial class VacinaConsultas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descricao",
                table: "Vacinas");

            migrationBuilder.DropColumn(
                name: "Observacoes",
                table: "Consultas");

            migrationBuilder.AddColumn<string>(
                name: "Motivo",
                table: "Consultas",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Motivo",
                table: "Consultas");

            migrationBuilder.AddColumn<string>(
                name: "Descricao",
                table: "Vacinas",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Observacoes",
                table: "Consultas",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }
    }
}
