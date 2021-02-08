using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;
using Api.Model;
using Castle.Core.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Api.Controller
{
    [Route("api/[controller]")]
    public class FileTypeController : BaseController<FileType>
    {
        public FileTypeController(ILogger<FileTypeController> logger, FileServConfig config, FileDbContext dbContext) : base(logger, config, dbContext)
        {
        }

        protected override IQueryable<FileType> GetQuery(FileType input)
        {
            return _db
            .WhereIf(string.IsNullOrEmpty(input.Ext), item => item.Ext == string.Empty)
            .WhereIf(input.Ext, item => item.Ext.Contains(input.Ext))
            ;
        }

        [HttpGet, Route("GetTypeId")]
        public async Task<FileType> GetTypeByExtAsync(string ext)
        {
            var query = GetQuery(new FileType { Ext = ext });
            return await query.FirstOrDefaultAsync();
        }
    }
}
