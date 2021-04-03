using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using ProductShop.Controllers.Api;
using ProductShop.Models;
using ProductShopBusinessLayer.Classes;
using ProductShopDataObjects.Classes;
using ProductShopDataObjects.Dtos;

namespace ProductShop.Tests
{
    [TestClass]
    public class ProductControllerTests
    {
        [TestMethod]
        public void Test_GetProducts_Returns_AllProducts_Correctly()
        {
            var testData = new List<IProduct>()
            {
                new ProductItem { Id = 1, Title = "Title 1", Description = "Desc 1", ImagePath = "Path 1", Price = 100 },
                new ProductItem { Id = 2, Title = "Title 2", Description = "Desc 2", ImagePath = "Path 2", Price = 600 },
                new ProductItem { Id = 3, Title = "Title 3", Description = "Desc 3", ImagePath = "Path 3", Price = 900 },
            };

            var svc = new Mock<IProductProvider>();
            svc.Setup(x => x.GetAllProducts())
                .Returns(Task.FromResult(testData.AsEnumerable()));

            var ctr = new ProductController(svc.Object);
            var res = ctr.GetProducts().GetAwaiter().GetResult();

            res.Should().BeEquivalentTo(testData);
        }

        [TestMethod]
        public void Test_GetProduct_Returns_Matching_Product()
        {
            var testData = new List<IProduct>()
            {
                new ProductItem { Id = 1, Title = "Title 1", Description = "Desc 1", ImagePath = "Path 1", Price = 100 },
                new ProductItem { Id = 2, Title = "Title 2", Description = "Desc 2", ImagePath = "Path 2", Price = 600 },
                new ProductItem { Id = 3, Title = "Title 3", Description = "Desc 3", ImagePath = "Path 3", Price = 900 },
            };

            var svc = new Mock<IProductProvider>();            
            svc.Setup(x => x.GetProductById(It.IsAny<int>()))
                .Returns((int id) =>
                {
                    var matchedPrd = testData.FirstOrDefault(x => x.Id == id);
                    var found = matchedPrd != null;
                    var errMsg = found ? new string[0] : new[] { "No product found" };
                    var matchedPrdRes = new OperationResult<IProduct>(found, matchedPrd, errMsg);
                    return Task.FromResult(matchedPrdRes);
                });

            var ctr = new ProductController(svc.Object);

            var testInputId = 3;
            var res = ctr.GetProduct(testInputId).GetAwaiter().GetResult();

            var expected = testData.FirstOrDefault(x => x.Id == testInputId);
            res.Should().Equals(expected);
        }

        [TestMethod]
        public void Test_SaveProduct_Updates_Product_Correctly()
        {
            var testData = new List<IProduct>()
            {
                new ProductItem { Id = 1, Title = "Title 1", Description = "Desc 1", ImagePath = "Path 1", Price = 100 },
                new ProductItem { Id = 2, Title = "Title 2", Description = "Desc 2", ImagePath = "Path 2", Price = 600 },
                new ProductItem { Id = 3, Title = "Title 3", Description = "Desc 3", ImagePath = "Path 3", Price = 900 },
            };

            var svc = new Mock<IProductProvider>();

            svc.Setup(x => x.GetProductById(It.IsAny<int>()))
                .Returns((int id) =>
                {
                    var matchedPrd = testData.FirstOrDefault(x => x.Id == id);
                    var found = matchedPrd != null;
                    var errMsg = found ? new string[0] : new[] { "No product found" };
                    var matchedPrdRes = new OperationResult<IProduct>(found, matchedPrd, errMsg);
                    return Task.FromResult(matchedPrdRes);
                });

            svc.Setup(x => x.SaveProduct(It.IsAny<IProduct>()))
                .Returns((IProduct dto) =>
                {
                    var matchedPrd = testData.FirstOrDefault(x => x.Id == dto.Id);
                    var found = matchedPrd != null;
                    var errMsg = found ? new string[0] : new[] { "No product found" };

                    if(found)
                    {
                        matchedPrd.Price = dto.Price;
                        matchedPrd.Title = dto.Title;
                        matchedPrd.Description = dto.Description;
                        matchedPrd.ImagePath = dto.ImagePath;
                    }

                    var matchedPrdRes = new OperationResult(found, errMsg);
                    return Task.FromResult(matchedPrdRes);
                });

            var ctr = new ProductController(svc.Object);

            var testInputProduct = new ProductDto
            {
                Id = 2,
                Title = "New Title 2",
                Description = "New Description 2",
                ImagePath = "New image path 2",
                Price = 5000
            };

            var res = ctr.SaveProduct(testInputProduct).GetAwaiter().GetResult();

            res.Should().NotBeNull();
            res.Success.Should().BeTrue();

            var existingPrd = testData.FirstOrDefault(x => x.Id == testInputProduct.Id);
            existingPrd.Title.Should().Equals(testInputProduct.Title);
            existingPrd.Description.Should().Equals(testInputProduct.Description);
            existingPrd.ImagePath.Should().Equals(testInputProduct.ImagePath);
            existingPrd.Price.Should().Equals(testInputProduct.Price);
        }
    }
}
