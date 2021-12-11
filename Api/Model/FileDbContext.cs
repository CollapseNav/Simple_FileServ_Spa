using System;
using System.IO;
using Api.Common;
using Microsoft.EntityFrameworkCore;

namespace Api.Model
{
    public class FileDbContext : DbContext
    {
        private readonly FileServConfig _config;
        public DbSet<File> Files { get; set; }
        public DbSet<Dir> Dirs { get; set; }
        public DbSet<FileType> FileTypes { get; set; }
        public FileDbContext(DbContextOptions<FileDbContext> options, FileServConfig config) : base(options)
        {
            _config = config;
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            if (!Directory.Exists(_config.FileStore + _config.FullPath))
            {
                builder.Entity<Dir>().HasData(new Dir
                {
                    FileName = _config.FullPath.Split("/")[^1],
                    AddTime = DateTime.Now,
                    Id = Guid.NewGuid(),
                    IsVisible = true,
                    MapPath = string.Empty
                });
                try
                {
                    Directory.CreateDirectory(_config.FileStore + _config.FullPath);
                }
                catch { }
            }
            base.OnModelCreating(builder);
        }
    }
}
