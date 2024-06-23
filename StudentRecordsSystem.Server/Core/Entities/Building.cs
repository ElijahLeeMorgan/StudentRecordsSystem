namespace StudentRecordsSystem.Server.Core.Entities
{
    public class Building : BaseEntity
    {
        public string Name { get; set; } = "Building";
        public string Address { get; set; } = "1234 Building St.";
        public string PhoneNumber { get; set; } = "123-456-7890";

        //Relations
        public ICollection<Grade> Grades { get; set; }
    }
}
