using ProductShop.Infrastructure.Utility;
using ProductShop.Mapper;
using ProductShop.Models;
using ProductShopBusinessLayer.Classes;
using ProductShopDataObjects.Classes;
using System;
using System.Web.Mvc;

namespace ProductShop.Controllers
{
    public class EditController : Controller
    {
        private readonly IProductProvider _productProvider;
        private readonly IObjectMapper _objectMapper;
        private readonly IErrorHandler _errorHandler;

        public EditController(IProductProvider productProvider, 
            IObjectMapper objectMapper,
            IErrorHandler errorHandler)
        {
            _productProvider = productProvider;
            _objectMapper = objectMapper;
            _errorHandler = errorHandler;
        }

        // GET: Edit
        [Route("edit/product/{id}")]
        public ActionResult EditProduct(int id)
        {
            var model = new EditProductViewModel();
            try
            {
                var product = _productProvider.GetProductById(id);
                _objectMapper.Map<IProduct, EditProductViewModel>(product, model);
            }
            catch(Exception ex)
            {
                ModelState.AddModelError("ModelError",
                    _errorHandler.ManageError(ex).Message);
            }

            return View("EditProduct", model);
        }

        [HttpPost]
        [Route("edit/product/save")]
        //[ValidateAntiForgeryToken]
        public ActionResult SaveProduct(EditProductViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var product = new ProductItem();
                    _objectMapper.Map<EditProductViewModel, ProductItem>(model, product);
                    _productProvider.SaveProduct(product);
                    return new RedirectResult($"/product/{model.Id}");
                }
            }
            catch(Exception ex)
            {
                ModelState.AddModelError("ModelError",
                    _errorHandler.ManageError(ex).Message);
            }

            return View(model);
        }
    }
}