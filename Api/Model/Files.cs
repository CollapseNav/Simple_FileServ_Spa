using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Api.Controller;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Model
{
    public class File : BaseFile
    {
        public string ContentType { get; set; }
        [ForeignKey("ParentId"), JsonIgnore]
        public virtual Dir Parent { get; set; }
        public override string MapPath { get; set; }

        public File Init(IFormFile file)
        {
            base.Init();
            Ext = Path.GetExtension(file.FileName);
            ContentType = file.ContentType;
            MapPath += "/" + file.FileName;
            Size = file.Length.ToString();
            FileName = file.FileName;
            return this;
        }
    }
}
