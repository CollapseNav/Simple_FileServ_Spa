using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Api.Common;
using Api.Controller;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Model
{
    public class BaseFile : BaseEntity
    {
        [MaxLength(100)]
        public string FileName { get; set; }
        public virtual string MapPath { get; set; }
        [MaxLength(20)]
        public string Sys { get; set; }
        [MaxLength(50)]
        public string Size { get; set; }
        public Guid? ParentId { get; set; }
        public Guid? TypeId { get; set; }
        [ForeignKey("TypeId")]
        public virtual FileType FileType { get; set; }
        public bool IsVisible { get; set; } = true;
        [MaxLength(20)]
        public string Ext { get; set; }
    }
}
