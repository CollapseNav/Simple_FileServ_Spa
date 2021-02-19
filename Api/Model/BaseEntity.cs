using System;
using System.ComponentModel.DataAnnotations;

namespace Api.Model
{
    public class BaseEntity
    {
        [Key]
        public Guid? Id { get; set; }
        public DateTime? AddTime { get; set; }
        public virtual void Init()
        {
            Id = Guid.NewGuid();
            AddTime = DateTime.Now;
        }
    }
}
