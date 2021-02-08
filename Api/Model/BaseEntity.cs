using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
