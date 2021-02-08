using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Api.Controller;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Model
{
    public class Dir : BaseFile
    {
        [ForeignKey("ParentId"), JsonIgnore]
        public virtual Dir Parent { get; set; }
        public virtual List<File> Files { get; set; }
        public virtual List<Dir> Dirs { get; set; }
        public override void Init()
        {
            MapPath += "/" + FileName;
            Ext = string.Empty;
        }
    }
}
