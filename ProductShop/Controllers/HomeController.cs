using System.Web.Mvc;

namespace ProductShop.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {
        }
        [Route("{*url}")]
        public ActionResult Index()
        {
            return View();
        }
    }
}