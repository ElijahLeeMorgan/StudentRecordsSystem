using StudentRecordsSystem.Server.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace StudentRecordsSystem.Server.Core.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Building> Buildings { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Class> Classes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Grade>()
                .HasOne(grade => grade.Building)
                .WithMany(building => building.Grades)
                .HasForeignKey(grade => grade.BuildingID);
                

            modelBuilder.Entity<Student>()
                .HasOne(student => student.Grade)
                .WithMany(grade => grade.Students)
                .HasForeignKey(student => student.GradeID);

            modelBuilder.Entity<Class>()
                .HasOne(classEntity => classEntity.Student)
                .WithMany(student => student.Classes)
                .HasForeignKey(classEntity => classEntity.StudentID);

            // Enum to string conversion
            modelBuilder.Entity<Grade>()
                .Property(grade => grade.Year)
                .HasConversion<string>();

            modelBuilder.Entity<Class>()
                .Property(classEntity => classEntity.Grade)
                .HasConversion<string>();
        }
    }
}
