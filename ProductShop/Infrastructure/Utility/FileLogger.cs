using System;
using System.Configuration;
using System.IO;
using System.Threading.Tasks;

namespace ProductShop.Infrastructure.Utility
{
    public class FileLogger : ILogger
    {
        private string _filePath;
        private static object _fileLock = new object();

        public FileLogger()
        {
            _filePath = ConfigurationManager.AppSettings["LogFilePath"];
        }
        public async Task LogAsync(Exception ex)
        {
            await Task.Factory.StartNew(() =>
           {
               lock (_fileLock)
               {
                   File.AppendAllText(_filePath, ex.ToString());
               }
           });
        }
    }
}