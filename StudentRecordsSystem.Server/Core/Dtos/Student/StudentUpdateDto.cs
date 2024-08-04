namespace StudentRecordsSystem.Server.Core.Dtos.Student
{
    public class StudentUpdateDto
    {
        public string FirstName { get; set; } = "John";
        public string LastName { get; set; } = "Doe";
        public ushort Detentions { get; set; }
        public ushort Absences { get; set; }
        public string EmergencyContact { get; set; } = "Jane Doe";
        public float GPA { get; set; } = 3.0f;
        public string Email { get; set; } = "johndoe@example.com";
        public ulong GradeID { get; set; }
    }
}
