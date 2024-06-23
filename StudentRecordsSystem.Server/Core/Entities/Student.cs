namespace StudentRecordsSystem.Server.Core.Entities
{
    public class Student : BaseEntity // This is doing too much at once. I should've seen this anti-pattern while designing, but good lesson learned for now.
    {
        public string FirstName { get; set; } = "John";
        public string LastName { get; set; } = "Doe";
        public ushort Detentions { get; set; } //TODO Change to calulate total number of abscenses in all Classes. Move Detentions and Absences to Class Entity.
        public ushort Absences { get; set; }
        public string EmergencyContact { get; set; } = "Jane Doe";
        public float GPA { get; set; } = 0.0f;
        public string Email { get; set; } = "johndoe@example.com";


        //Relations
        public ulong GradeID { get; set; }
        public Grade Grade { get; set; }
        public ICollection<Class> Classes { get; set; }
    }
}
