using StudentRecordsSystem.Server.Core.Enums;

namespace StudentRecordsSystem.Server.Core.Dtos.Grade
{
    public class GradeUpdateDto
    {
        public GradeYear Year { get; set; }
        public ulong BuildingID { get; set; }
    }
}
