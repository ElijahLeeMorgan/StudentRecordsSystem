using StudentRecordsSystem.Server.Core.Enums;

namespace StudentRecordsSystem.Server.Core.Dtos.Grade
{
    public class GradeGetDto
    {
        public ulong ID { get; set; }
        public GradeYear Year { get; set; }
        public ulong BuildingID { get; set; }
        public string BuildingName { get; set; }//Name of Building (Parent Class)
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
