using System.Web.Mvc;
using ProductShop.Models;
using ProductShopDataObjects.Classes;

namespace ProductShop.Controllers
{
    public class HomeController : Controller
    {
        private readonly IProductProvider _productProvider;

        public HomeController(IProductProvider productProvider) =>
            _productProvider = productProvider;

        public ActionResult Index()
        {
            HomepageViewModel model = new HomepageViewModel
            {
                Products = _productProvider.GetAllProducts()
            };

            return View(model);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}