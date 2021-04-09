using ProductShop.Infrastructure.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProductShop.Attributes
{
    public class CustomErrorHandlerAttribute : HandleErrorAttribute
    {
        private readonly ILogger _logger;
        public CustomErrorHandlerAttribute(ILogger logger)
        {
            _logger = logger;
        }
        public override void OnException(ExceptionContext filterContext)
        {
            filterContext.ExceptionHandled = true;
            _logger.LogAsync(filterContext.Exception);

            filterContext.Result = new ViewResult
            {
                ViewName = "~/Views/Shared/error.cshtml"
            };

        }
    }
}