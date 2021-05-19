using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Api.Common;
using Api.Dto;
using Api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Api.Controller
{
    [Route("api/[controller]")]
    public class FileController : BaseController<Model.File, GetFileDto>
    {
        private readonly DirController _dir;
        private readonly FileTypeController _fileType;
        public FileController(ILogger<FileController> logger, FileServConfig config, FileDbContext dbContext, DirController dir, FileTypeController fileTypeController) : base(logger, config, dbContext)
        {
            _dir = dir;
            _fileType = fileTypeController;
        }
        protected override IQueryable<Model.File> GetQuery(GetFileDto input)
        {
            return base.GetQuery(input)
            ;
        }

        /// <summary>
        /// 单文件上传
        /// </summary>
        [DisableRequestSizeLimit]
        [HttpPost, Route("{dirId}")]
        public async Task<Model.File> PostFileAsync(Guid dirId)
        {
            var file = HttpContext.Request.Form.Files[0];
            return await SaveFileAsync(dirId, file);
        }

        private async Task<Model.File> SaveFileAsync(Guid dirId, IFormFile file)
        {
            var model = new Model.File();
            model.SetParent(await _dir.FindAsync(dirId));
            model.Init(file, await _fileType.GetListAsync(new GetFileTypeDto { }));
            var fullFilePath = _config.FileStore + _config.FullPath + model.MapPath;
            // TODO 文件重复处理
            if (System.IO.File.Exists(fullFilePath))
                return new Model.File { Id = null };

            if (!model.TypeId.HasValue)
            {
                var fileType = await _fileType.GetTypeByExtAsync(model.Ext);
                model.TypeId = fileType?.Id;
            }
            await _db.AddAsync(model);
            _log.LogInformation($"Save File {file.FileName} , size: {file.Length}; type: {model.Ext};");

            try
            {
                using FileStream fs = new(fullFilePath, FileMode.CreateNew);
                await file.CopyToAsync(fs);
                await SaveChangesAsync();
            }
            catch (IOException)
            {
                throw new IOException("文件上传失败,请稍候重试.");
            }

            return model;
        }

        private string GetFileName(string fileName)
        {
            var filePath = _config.FullPath + "/";
            string fileExt = Path.GetExtension(fileName);
            if (_config.UseRawName)
            {
                fileName = string.Join(".", fileName.Split(".")[0..^1]);
                if (System.IO.File.Exists(filePath + fileName + fileExt))
                    fileName += "_" + DateTime.Now.Millisecond;
            }
            else
                fileName += Guid.NewGuid().ToString();
            fileName += fileExt;
            return fileName;
        }

        /// <summary>
        /// 根据文件Id获取文件
        /// </summary>
        [HttpGet, Route("download/{id}")]
        public async Task<IActionResult> GetFileAsync(Guid? id)
        {
            var range = Request.Headers["Range"].ToString();
            if (range.Length > 5)
                range = range[(range.IndexOf("=") + 1)..range.IndexOf("-")];
            var file = await FindAsync(id);
            var filepath = _config.FileStore + _config.FullPath + "/" + file.MapPath;
            var memoryStream = new MemoryStream();
            using var stream = new FileStream(filepath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            await stream.CopyToAsync(memoryStream);
            memoryStream.Seek(0, SeekOrigin.Begin);
            _log.LogInformation($"Download File {file.FileName} , Id : {id.Value}");

            Response.Headers.Add("Content-Disposition", "attachment; filename=" + HttpUtility.UrlEncode(file.FileName, Encoding.UTF8));
            Response.Headers.Add("Content-Type", file.ContentType);
            Response.ContentLength = long.Parse(file.Size);
            Response.Headers.Add("Accept-Ranges", "bytes");
            Response.Headers.Add("Content-Range", ((string.IsNullOrEmpty(range.ToString()) ? 0 : int.Parse(range)) + (long.Parse(file.Size) - 1)).ToString());
            return new FileStreamResult(memoryStream, "application/octet-stream");
        }

        public override async Task DeleteAsync(Guid? id)
        {
            try
            {
                var entity = await base.FindAsync(id);
                var delPath = _config.FileStore + _config.FullPath + entity.MapPath;
                _db.Remove(entity);
                if (System.IO.File.Exists(delPath))
                    System.IO.File.Delete(delPath);
            }
            catch { }
            await SaveChangesAsync();
        }

        [HttpGet, Route("ByName")]
        public async Task<ICollection<Model.File>> FindFileByNameAsync([FromQuery] string name)
        {
            var files = await _db.Where(item => item.FileName.Contains(name ?? "")).Take(10).ToListAsync();
            return files;
        }
    }
}
