using System.Web.Mvc;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProductShop.Controllers.Mvc;

namespace ProductShop.Tests
{
    [TestClass]
    public class HomeControllerTests
    {
        [TestMethod]
        public void Test_Index_Returns_StaticIndex_FileResult()
        {
            var ctr = new HomeController();
            var res = ctr.Index();

            res.Should().BeOfType(typeof(FilePathResult));

            var fileRes = (FilePathResult)res;
            fileRes.ContentType.Should().Be("text/html");
            fileRes.FileName.Should().Be("~/ClientApp/build/index.html");
        }
    }
}
