namespace StudentRecordsSystem.Server.Core.Dtos.Student
{
    public class StudentGetDto
    {
        public ulong ID { get; set; }
        public string FirstName { get; set; } = "John";
        public string LastName { get; set; } = "Doe";
        public ushort Detentions { get; set; }
        public ushort Absences { get; set; }
        public string EmergencyContact { get; set; } = "Jane Doe";
        public float GPA { get; set; } = 3.0f;
        public string Email { get; set; } = "johndoe@example.com";
        public ulong GradeID { get; set; }
        public string GradeYear { get; set; }//Year of Grade (Parent Class)
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
