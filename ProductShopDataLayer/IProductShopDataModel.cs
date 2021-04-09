using System.Data.Entity;
using ProductShopDataLayer.Classes;

namespace ProductShopDataLayer
{
    public interface IProductShopDataModel
    {
        DbSet<Product> Products { get; set; }
    }
}