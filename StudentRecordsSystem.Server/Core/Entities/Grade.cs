using StudentRecordsSystem.Server.Core.Enums;

namespace StudentRecordsSystem.Server.Core.Entities
{
    public class Grade : BaseEntity
    {
        public GradeYear Year { get; set; }

        //Relations
        public ulong BuildingID { get; set; }
        public Building Building { get; set; }

        public ICollection<Student> Students { get; set; }
    }
}
