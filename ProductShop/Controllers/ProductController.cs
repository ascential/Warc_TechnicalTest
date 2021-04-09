using ProductShop.Models;
using ProductShopDataObjects.Classes;
using System.Web.Mvc;

namespace ProductShop.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductProvider _productProvider;

        public ProductController(IProductProvider productProvider)
        {
            _productProvider = productProvider;
        }
        public ActionResult Index()
        {
            return View();
        }

        [Route("product/{id}")]
        public ActionResult Product(int id)
        {
            ProductViewModel model = new ProductViewModel
            {
                Product = _productProvider.GetProductById(id)
            };

            return View("Product", model);
        }
    }
}