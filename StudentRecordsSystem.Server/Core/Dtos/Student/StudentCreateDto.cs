namespace StudentRecordsSystem.Server.Core.Dtos.Student
{
    public class StudentCreateDto
    {
        public string FirstName { get; set; } = "John";
        public string LastName { get; set; } = "Doe";
        public string EmergencyContact { get; set; } = "Jane Doe";
        public string Email { get; set; } = "johndoe@example.com";
        public ulong GradeID { get; set; }
    }
}
