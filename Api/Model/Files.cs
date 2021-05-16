using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;

namespace Api.Model
{
    public class File : BaseFile
    {
        public string ContentType { get; set; }
        [ForeignKey("ParentId"), JsonIgnore]
        public virtual Dir Parent { get; set; }
        public override string MapPath { get; set; }
        public File Init(IFormFile file, ICollection<FileType> typequery = null)
        {
            base.Init();
            Ext = Path.GetExtension(file.FileName);
            ContentType = file.ContentType;
            MapPath += "/" + file.FileName;
            TruePath = MapPath;
            Size = file.Length.ToString();
            FileName = file.FileName;
            if (string.IsNullOrWhiteSpace(Ext)) TypeId = null;
            else
                TypeId = typequery?.FirstOrDefault(item => item.Ext.Contains(Ext))?.Id;
            return this;
        }
    }
}
