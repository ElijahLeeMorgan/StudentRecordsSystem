using System.ComponentModel.DataAnnotations;

namespace StudentRecordsSystem.Server.Core.Entities
{
    public abstract class BaseEntity
    {
        [Key]
        public ulong ID { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = true;
    }
}
