using StudentRecordsSystem.Server.Core.Enums;

namespace StudentRecordsSystem.Server.Core.Entities
{
    public class Class : BaseEntity //I know this isn't the best name for a class, but I'm trying to keep things simple.
    {                               //TODO Refactor as EnrolledClasses
        public string Subject { get; set; } = "Mathematics";
        public ClassGrade Grade { get; set; } = ClassGrade.C;

        //Relations
        public ulong StudentID { get; set; }
        public Student Student { get; set; }
        public ICollection<Class> Classes { get; set; }
    }
}
