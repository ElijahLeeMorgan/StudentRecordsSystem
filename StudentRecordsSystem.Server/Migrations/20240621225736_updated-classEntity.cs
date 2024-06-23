using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentRecordsSystem.Server.Migrations
{
    /// <inheritdoc />
    public partial class updatedclassEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Subject",
                table: "Classes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Subject",
                table: "Classes");
        }
    }
}
