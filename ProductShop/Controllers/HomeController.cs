using System.Web.Mvc;

namespace ProductShop.Controllers.Mvc
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var res = base.File("~/FrontEndSPA/build/index.html", "text/html");
            return res;
        }
    }
}