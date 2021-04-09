using System;
using System.Threading.Tasks;

namespace ProductShop.Infrastructure.Utility
{
    public interface ILogger
    {
       Task LogAsync(Exception ex);
    }
}