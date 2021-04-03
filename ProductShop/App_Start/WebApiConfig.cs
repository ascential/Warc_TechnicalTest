using System.Web.Http;
using System.Web.Http.Cors;

namespace ProductShop
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // This is for here only for dev testing   
            var localhostDev = new EnableCorsAttribute("http://localhost:3000,http://localhost:5000", "*", "*");
            config.EnableCors(localhostDev);       

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}"
            );

            config.Routes.MapHttpRoute(
                name: "ParameterizedApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
