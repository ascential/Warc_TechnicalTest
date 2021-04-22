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
        private readonly ProductShopDataModel _context;

        public ProductProvider(ProductShopDataModel context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<IProduct>> GetAllProducts()
        {

                var products = await _context.Products
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

        public async Task<Result<IProduct>> GetProductById(int id)
        {
            var dataProduct = await _context.Products.FirstOrDefaultAsync(i => i.Id == id);

            if (dataProduct == null)
            {
                return new Result<IProduct>(false, null, new[] { $"No product for id {id}" });
            }

            IProduct product = new ProductItem
            {
                Id = dataProduct.Id,
                Price = dataProduct.Price,
                Title = dataProduct.Title,
                Description = dataProduct.Description,
                ImagePath = dataProduct.ImagePath
            };

            return new Result<IProduct>(true, product);
        }

        public async Task<Result> SaveProduct(IProduct product)
        {
            var dataProduct = await _context.Products.FirstOrDefaultAsync(i => i.Id == product.Id);

            if (dataProduct == null)
            {
                return new Result(false, new[] { $"No product for id {product.Id}" });
            }

            dataProduct.ImagePath = product.ImagePath;
            dataProduct.Price = product.Price;
            dataProduct.Description = product.Description;
            dataProduct.Title = product.Title;

            try
            {
                var saveRes = await _context.SaveChangesAsync();
                return new Result(true);
            }
            catch(Exception ex)
            {
                return new Result(false, new[] { $"Error while saving product : Id {product.Id}. Error : {ex.Message}" });
            }
        }
    }
}
