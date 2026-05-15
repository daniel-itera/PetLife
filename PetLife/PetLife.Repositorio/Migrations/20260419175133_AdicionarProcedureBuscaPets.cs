using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetLife.Repositorio.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarProcedureBuscaPets : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        var sp = @"
            CREATE PROCEDURE SP_BuscarPetsAtivosPorTipo
                @Tipo INT
            AS
            BEGIN
                SELECT Id, Nome, Raca, Idade, Peso, Tipo, Ativo 
                FROM Pets 
                WHERE Tipo = @Tipo AND Ativo = 1
            END";

        migrationBuilder.Sql(sp);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.Sql("DROP PROCEDURE SP_BuscarPetsAtivosPorTipo");
    }
}

}
