using StudentRecordsSystem.Server.Core.Enums;

namespace StudentRecordsSystem.Server.Core.Dtos.Class
{
    public class ClassUpdateDto
    {
        public string Subject { get; set; } = "Mathematics";
        public ClassGrade Grade { get; set; } = ClassGrade.C;
        public ulong StudentID { get; set; }
    }
}