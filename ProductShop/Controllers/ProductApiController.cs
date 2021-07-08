using System.Net;
using System.Web.Mvc;
using ProductShop.Models;
using ProductShopBusinessLayer.Classes;
using ProductShopDataObjects.Classes;

namespace ProductShop.Controllers
{
    public class ProductApiController : Controller
    {
        private readonly IProductProvider _productProvider;

        public ProductApiController(IProductProvider productProvider) =>
            _productProvider = productProvider;

        [HttpGet]
        [Route("api/product")]
        public JsonResult Index()
        {
            Response.StatusCode = (int)HttpStatusCode.OK;
            return Json(_productProvider.GetAllProducts(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("api/product/{id}")]
        public JsonResult Product(int id)
        {
            Response.StatusCode = (int)HttpStatusCode.OK;
            return Json(_productProvider.GetProductById(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("api/product")]
        public JsonResult ProductSave(EditProductViewModel model)
        {
            var product = new ProductItem
            {
                Id = model.Id,
                Price = model.Price,
                Title = model.Title,
                ImagePath = model.ImagePath,
                Description = model.Description,
            };
            Response.StatusCode = (int)HttpStatusCode.OK;

            _productProvider.SaveProduct(product);
            return Json(product, JsonRequestBehavior.AllowGet);
        }
    }
}