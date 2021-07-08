using System.Web.Mvc;
using ProductShop.Models;
using ProductShopBusinessLayer.Classes;
using ProductShopDataObjects.Classes;

namespace ProductShop.Controllers
{
    public class EditController : Controller
    {
        private readonly IProductProvider _productProvider;

        public EditController(IProductProvider productProvider) =>
            _productProvider = productProvider;

        // GET: Edit
        [Route("edit/product/{id}")]
        public ActionResult EditProduct(int id)
        {
            var product = _productProvider.GetProductById(id);

            EditProductViewModel model = new EditProductViewModel
            {
                Price = product.Price,
                Id = product.Id,
                Title = product.Title,
                ImagePath = product.ImagePath,
                Description = product.Description,
            };

            return View("EditProduct", model);
        }

        [HttpPost]
        [Route("edit/product/save")]
        public ActionResult SaveProduct(EditProductViewModel model)
        {
            var product = new ProductItem
            {
                Id = model.Id,
                Price = model.Price,
                Title = model.Title,
                ImagePath = model.ImagePath,
                Description = model.Description,
            };

            _productProvider.SaveProduct(product);

            return new RedirectResult($"/product/{model.Id}");
        }
    }
}