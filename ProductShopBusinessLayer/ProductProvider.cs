using ProductShopBusinessLayer.Classes;
using ProductShopDataLayer;
using ProductShopDataObjects.Classes;
using ProductShopDataObjects.Dtos;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductShopBusinessLayer
{
    public class ProductProvider: IProductProvider
    {
        public async Task<IEnumerable<IProduct>> GetAllProducts()
        {
            using (var productsDb = new ProductShopDataModel())
            {
                var products = await productsDb.Products
                                    .Select(p => new ProductItem
                                    {
                                        Id = p.Id,
                                        Price = p.Price,
                                        Title = p.Title,
                                        Description = p.Description,
                                        ImagePath = p.ImagePath
                                    })
                                    .ToListAsync();
                                    

                return products.OfType<IProduct>();
            }
        }

        public async Task<OperationResult<IProduct>> GetProductById(int id)
        {
            using (ProductShopDataModel productsDb = new ProductShopDataModel())
            {
                var dataProduct = await productsDb.Products.FirstOrDefaultAsync(i => i.Id == id);

                if (dataProduct == null)
                {
                    return new OperationResult<IProduct>(false, null, new[] { $"No product for id {id}" });
                }

                IProduct product = new ProductItem
                {
                    Id = dataProduct.Id,
                    Price = dataProduct.Price,
                    Title = dataProduct.Title,
                    Description = dataProduct.Description,
                    ImagePath = dataProduct.ImagePath
                };

                return new OperationResult<IProduct>(true, product);
            }
        }

        public async Task<OperationResult> SaveProduct(IProduct product)
        {
            using (var productsDb = new ProductShopDataModel())
            {
                var dataProduct = await productsDb.Products.FirstOrDefaultAsync(i => i.Id == product.Id);

                if (dataProduct == null)
                {
                    return new OperationResult(false, new[] { $"No product for id {product.Id}" });
                }

                dataProduct.ImagePath = product.ImagePath;
                dataProduct.Price = product.Price;
                dataProduct.Description = product.Description;
                dataProduct.Title = product.Title;

                try
                {
                    var saveRes = await productsDb.SaveChangesAsync();
                    return new OperationResult(true);
                }
                catch(Exception ex)
                {
                    return new OperationResult(false, new[] { $"Error while saving product : Id {product.Id}. Error : {ex.Message}" });
                }
            }
        }
    }
}
