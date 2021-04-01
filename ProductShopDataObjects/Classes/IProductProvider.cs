using ProductShopDataObjects.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductShopDataObjects.Classes
{
    public interface IProductProvider
    {
        Task<IEnumerable<IProduct>> GetAllProducts();
        Task<OperationResult<IProduct>> GetProductById(int id);
        Task<OperationResult> SaveProduct(IProduct product);
    }
}
