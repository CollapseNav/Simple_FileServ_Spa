using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;
using Api.Dto;
using Api.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Api.Controller
{
    [Route("api/[controller]")]
    public class DirController : BaseController<Dir, GetDirDto>
    {
        private readonly FileTypeController _fileType;
        public DirController(ILogger<DirController> logger, FileServConfig config, FileDbContext dbContext, FileTypeController fileTypeController) : base(logger, config, dbContext)
        {
            _fileType = fileTypeController;
        }

        protected override IQueryable<Dir> GetQuery(GetDirDto input)
        {
            return _db
            .Include(item => item.Dirs)
            .Include(item => item.Files)
            .WhereIf(input.MapPath, item => item.MapPath == input.MapPath)
            .WhereIf(input.Id.HasValue, item => item.Id == input.Id)
            ;
        }

        [HttpPost]
        public async override Task<Dir> AddAsync([FromBody] Dir input)
        {
            input.Init();
            if (input.ParentId.HasValue)
                input.MapPath += (await FindAsync(input.ParentId))?.MapPath;

            var fullPath = _config.FileStore + _config.FullPath + input.MapPath;
            if (Directory.Exists(fullPath)) return null;

            if (!input.TypeId.HasValue)
                input.TypeId = (await _fileType.GetTypeByExtAsync(input.Ext)).Id;

            await _db.AddAsync(input);
            Directory.CreateDirectory(fullPath);

            await SaveChangesAsync();
            return input;
        }

        [HttpGet, Route("GetRootDir")]
        public async Task<Dir> GetRootDirAsync()
        {
            var query = _db.Where(item => item.MapPath == string.Empty);
            if (query.Any())
                return await query.Include(item => item.Dirs).Include(item => item.Files).FirstAsync();
            else return null;
        }

        [HttpGet, Route("GetDirTree")]
        public async Task<Dir> GetDirTreeAsync(Guid? id)
        {
            var dir = await _db.Where(item => item.Id == id).Include(item => item.FileType).Include(item => item.Dirs).Include(item => item.Files).FirstOrDefaultAsync();
            return dir;
        }


        public override async Task<Dir> FindAsync(Guid? id)
        {
            return await GetQuery(new GetDirDto { Id = id }).FirstOrDefaultAsync();
        }

        public override async Task DeleteAsync(Guid? id)
        {
            try
            {
                var entity = await base.FindAsync(id);
                var delPath = _config.FileStore + _config.FullPath + entity.MapPath;
                _db.Remove(entity);
                if (Directory.Exists(delPath))
                    Directory.Delete(delPath);
            }
            catch { }
            await SaveChangesAsync();
        }
    }
}
