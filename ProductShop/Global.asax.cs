using ProductShop.Infrastructure;
using ProductShopDataLayer;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace ProductShop
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            System.Web.Mvc.DependencyResolver.SetResolver(new Infrastructure.DependencyResolver());
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
           // AntiForgeryConfig.UniqueClaimTypeIdentifier = ClaimTypes.Anonymous;
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            //can log error here as well.
            Server.ClearError();
            Response.Redirect("outoforder.html");
        }
    }
}
