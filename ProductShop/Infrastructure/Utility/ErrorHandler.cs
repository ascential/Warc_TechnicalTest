using System;

namespace ProductShop.Infrastructure.Utility
{
    public class ErrorHandler : IErrorHandler
    {
        private readonly ILogger _logger;
        public ErrorHandler(ILogger logger)
        {
            _logger = logger;
        }

        public Exception ManageError (Exception ex)
        {
            _logger.LogAsync(ex);
            // rethrow fatal error
            // add custom message
            return ex;
        } 
    }
}