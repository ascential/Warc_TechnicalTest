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
        public void TestSaveProduct()
        {
            var testData = new List<IProduct>()
            {
                new ProductItem { Id = 12, Title = "abc12", Description = "Description1 2", ImagePath = "c:/test.jpg", Price = 134 },
                new ProductItem { Id = 31, Title = "xyz31", Description = "Desc 3", ImagePath = "c:/xyz.jpg", Price = 567 },
            };

            var svc = new Mock<IProductProvider>();

            svc.Setup(x => x.GetProductById(It.IsAny<int>()))
                .Returns((int id) =>
                {
                    var matchedPrd = testData.FirstOrDefault(x => x.Id == id);
                    var found = matchedPrd != null;
                    var errMsg = found ? new string[0] : new[] { "null" };
                    var matchedPrdRes = new Result<IProduct>(found, matchedPrd, errMsg);
                    return Task.FromResult(matchedPrdRes);
                });

            svc.Setup(x => x.SaveProduct(It.IsAny<IProduct>()))
                .Returns((IProduct dto) =>
                {
                    var matchedPrd = testData.FirstOrDefault(x => x.Id == dto.Id);
                    var found = matchedPrd != null;
                    var errMsg = found ? new string[0] : new[] { "null" };

                    if(found)
                    {
                        matchedPrd.Price = dto.Price;
                        matchedPrd.Title = dto.Title;
                        matchedPrd.Description = dto.Description;
                        matchedPrd.ImagePath = dto.ImagePath;
                    }

                    var matchedPrdRes = new Result(found, errMsg);
                    return Task.FromResult(matchedPrdRes);
                });
        }
    }
}
