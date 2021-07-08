using System.Net.Http;

namespace ProductShopApp.Infrastructure
{
    public class ProductShopHttpService : HttpService
    {
        public ProductShopHttpService() { }
        public ProductShopHttpService(HttpClient httpClient) : base(httpClient) { }
    }
}
