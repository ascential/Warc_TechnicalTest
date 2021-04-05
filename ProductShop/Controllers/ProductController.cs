using System.Web.Http;
using ProductShop.Models;
using ProductShopBusinessLayer;
using ProductShopBusinessLayer.Classes;
using ProductShopDataObjects.Classes;

namespace ProductShop.Controllers
{
    [RoutePrefix("api/product")]
    public class ProductController : ApiController
    {
        private readonly IProductProvider _productProvider;

        public ProductController()
        {
            _productProvider = new ProductProvider();
        }
        
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetProduct(int id)
        {
            ProductViewModel model = new ProductViewModel
            {
                Product = _productProvider.GetProductById(id)
            };

            return Ok(model);
        }
        [HttpGet]
        [Route("all")]
        public IHttpActionResult GetAllProducts()
        {
            HomepageViewModel model = new HomepageViewModel
            {
                Products = _productProvider.GetAllProducts()
            };

            return Ok(model);
        }

        [HttpPost]
        [Route("update/{id}")]
        public IHttpActionResult SaveProduct(EditProductViewModel model)
        {
            var product = new ProductItem
            {
                Id = model.Id,
                Price = model.Price,
                Title = model.Title,
                ImagePath = model.ImagePath,
                Description = model.Description
            };

            _productProvider.SaveProduct(product);

            return Ok();
        }
    }
}