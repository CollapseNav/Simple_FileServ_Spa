using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Api.Common
{
    public class ReturnFileMapPath
    {
        public int Total { get; set; }
        public List<string> FileId { get; set; }
    }
    public class FileServConfig
    {
        public bool UseRawName { get; set; }
        public bool UseUnknowFiles { get; set; }
        public bool UseDirectoryBrowser { get; set; }

        private string filestore;
        public string FileStore
        {
            get { return filestore; }
            set
            {
                filestore = value.StartsWith("/") ? value : Directory.GetCurrentDirectory() + "/" + value;
            }
        }
        public string FullPath
        {
            get { return "/root"; }
            private set {; }
        }
        private string limitSize;
        public long MaxSize { get; private set; }
        public string ServeMapPath { get; set; }
        /// <summary>
        /// 单次上传允许的最大size 单位为 k
        /// </summary>
        public string LimitSize
        {
            get => limitSize;
            set
            {
                limitSize = value;
                var limit = limitSize;
                limit = limit.Replace(",", "");
                var tag = limit.ToLower().TakeLast(1).First().ToString();
                switch (tag)
                {
                    case "m":
                        {
                            limit = limit.Replace(tag, "");
                            MaxSize = long.Parse(limit) * 1024;
                            break;
                        }
                    case "g":
                        {
                            limit = limit.Replace(tag, "");
                            MaxSize = long.Parse(limit) * 1024 * 1024;
                            break;
                        }
                    default:
                        {
                            MaxSize = long.Parse(limit);
                            break;
                        }
                }
            }
        }
    }
}
