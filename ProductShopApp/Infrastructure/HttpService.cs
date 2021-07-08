using Newtonsoft.Json;
using ProductShopApp.Infrastructure.Exceptions;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ProductShopApp.Infrastructure
{
    public class HttpService : IHttpService
    {
        protected readonly HttpClient HttpClient;

        public HttpService() { }

        public HttpService(HttpClient httpClient)
        {
            HttpClient = httpClient;
        }

        public virtual async Task<T> Get<T>(string endpoint)
        {
            if (string.IsNullOrWhiteSpace(endpoint))
            {
                throw new HttpRequestException();
            }

            var response = await HttpClient.GetAsync(endpoint);

            if (!response.IsSuccessStatusCode)
            {
                HandleHttpErrorResponses(response, string.Empty);
            }

            var result = await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<T>(result, new JsonSerializerSettings
            {
                ContractResolver = new PrivateResolver(),
                ConstructorHandling = ConstructorHandling.AllowNonPublicDefaultConstructor
            });
        }

        public virtual async Task<string> Post(string endpoint, HttpContent content)
        {
            var response = await HttpClient.PostAsync(endpoint, content);

            if (!response.IsSuccessStatusCode)
            {
                var responseMessage = await response.Content.ReadAsStringAsync();
                HandleHttpErrorResponses(response, responseMessage);
            }

            return await response.Content.ReadAsStringAsync();
        }

        public virtual async Task<string> Put(string endpoint, string body)
        {
            var response = await HttpClient.PutAsync(endpoint, new StringContent(body, Encoding.UTF8, "application/json"));

            if (!response.IsSuccessStatusCode)
            {
                var responseMessage = await response.Content.ReadAsStringAsync();
                HandleHttpErrorResponses(response, responseMessage);
            }

            return await response.Content.ReadAsStringAsync();
        }

        public virtual async Task<string> Delete(string endpoint)
        {
            var response = await HttpClient.DeleteAsync(endpoint);

            if (!response.IsSuccessStatusCode)
            {
                var responseMessage = await response.Content.ReadAsStringAsync();
                HandleHttpErrorResponses(response, responseMessage);
            }

            return await response.Content.ReadAsStringAsync();
        }

        private static void HandleHttpErrorResponses(HttpResponseMessage response, string content)
        {
            throw response.StatusCode switch
            {
                HttpStatusCode.NotFound => new NotFoundException(content),
                HttpStatusCode.InternalServerError => new InternalServerErrorException(content),
                HttpStatusCode.BadRequest => new BadRequestException(content),
                HttpStatusCode.Forbidden => new ForbiddenException(content),
                HttpStatusCode.Conflict => new ConflictException(),
                _ => new Exception($"HTTP Error {(int)response.StatusCode} returned when requesting data with description {content}"),
            };
        }
    }

    public interface IHttpService
    {
        Task<T> Get<T>(string endpoint);
        Task<string> Post(string endpoint, HttpContent content);
        Task<string> Put(string endpoint, string body);
        Task<string> Delete(string endpoint);
    }
}
