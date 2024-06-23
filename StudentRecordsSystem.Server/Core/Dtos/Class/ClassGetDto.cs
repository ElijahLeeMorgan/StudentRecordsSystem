using StudentRecordsSystem.Server.Core.Enums;

namespace StudentRecordsSystem.Server.Core.Dtos.Class
{
    public class ClassGetDto
    {
        public ulong ID { get; set; }
        public string Subject { get; set; } = "Mathematics";
        public ClassGrade Grade { get; set; } = ClassGrade.C;
        public ulong StudentID { get; set; }
        public string StudentFirstName { get; set; }//Student First Name (Parent Class)
        public string StudentLastName { get; set; }//Student Last Name (Parent Class)
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}