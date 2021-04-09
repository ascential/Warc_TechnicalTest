using ProductShopDataLayer.Classes;
using System.Data.Entity;
using System.Linq;

namespace ProductShopDataLayer
{
    public class ProductShopDataModel : DbContext, IProductShopDataModel
    {
        public ProductShopDataModel()
            : base("name=ProductShopDBContext")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<ProductShopDataModel, Migrations.Configuration>());
        }

        public virtual  DbSet<Product> Products { get; set; }
    }
}
