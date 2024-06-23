using StudentRecordsSystem.Server.Core.Enums;

namespace StudentRecordsSystem.Server.Core.Dtos.Class
{
    public class ClassCreateDto
    {
        public string Subject { get; set; } = "Mathematics";
        public ulong StudentID { get; set; }
    }
}
