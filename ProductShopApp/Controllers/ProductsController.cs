using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ProductShopApp.Dtos;
using ProductShopApp.Infrastructure;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace ProductShopApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private ProductShopHttpService HttpService { get; }

        public ProductsController(ProductShopHttpService httpService) =>
            HttpService = httpService;

        // GET: api/<ProductsController>
        [HttpGet]
        public async Task<IEnumerable<ProductDto>> Get() =>
            await HttpService.Get<IEnumerable<ProductDto>>("api/product");

        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public async Task<ProductDto> Get(int id) =>
            await HttpService.Get<ProductDto>($"api/product/{id}");

        // POST api/<ProductsController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProductDto product)
        {
            var content = new StringContent(
                JsonConvert.SerializeObject(product),
                Encoding.UTF8,
                MediaTypeNames.Application.Json);

            await HttpService.Post($"api/product", content);
            return Ok();
        }
    }
}
