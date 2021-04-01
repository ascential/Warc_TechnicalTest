using ProductShop.Models;
using ProductShopBusinessLayer.Classes;
using ProductShopDataObjects.Classes;
using ProductShopDataObjects.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ProductShop.Controllers.Api
{
    public class ProductController : ApiController
    {
        private readonly IProductProvider _productProvider;

        public ProductController(IProductProvider productProvider)
        {
            _productProvider = productProvider ?? throw new ArgumentNullException(nameof(productProvider));
        }

        [HttpGet]
        [Route("allProducts")]
        public async Task<IEnumerable<ProductDto>> GetProducts()
        {
            var products = await _productProvider.GetAllProducts();
            var res = products.Select(x => new ProductDto
            {
                Id = x.Id,
                Description = x.Description,
                ImagePath = x.ImagePath,
                Price = x.Price,
                Title = x.Title

            });

            return res;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<OperationResult<ProductDto>> GetProduct(int id)
        {
            var getProductResult = await _productProvider.GetProductById(id);
            if (getProductResult.Success)
            {
                var product = getProductResult.DataState;
                var dto = new ProductDto
                {
                    Id = product.Id,
                    Description = product.Description,
                    ImagePath = product.ImagePath,
                    Price = product.Price,
                    Title = product.Title
                };

                return new OperationResult<ProductDto>(true, dto);
            }

            return new OperationResult<ProductDto>(false, null, getProductResult.Errors);
        }

        [HttpPost]
        [Route("save")]
        public async Task<OperationResult> SaveProduct([FromBody] ProductDto dto)
        {            
            if(dto == null)
            {
                return new OperationResult(false, new[] { "Model binding failed", $"Input parameter {nameof(dto)} is null" });
            }

            var product = await _productProvider.GetProductById(dto.Id);
            if (product == null)
            {
                return new OperationResult(false, new[] { $"No product found with Id : { dto.Id }" });
            }

            var prodToSave = new ProductItem
            {
                Id = dto.Id,
                Description = dto.Description,
                ImagePath = dto.ImagePath,
                Price = dto.Price,
                Title = dto.Title
            };

            var saveRes = await _productProvider.SaveProduct(prodToSave);
            return saveRes;            
        }
    }
}
