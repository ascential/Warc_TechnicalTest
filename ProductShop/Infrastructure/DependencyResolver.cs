using Ninject;
using ProductShop.Infrastructure.Utility;
using ProductShop.Mapper;
using ProductShopBusinessLayer;
using ProductShopDataObjects.Classes;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace ProductShop.Infrastructure
{
    public class DependencyResolver: IDependencyResolver
{
    private IKernel Kernel;

        public DependencyResolver()
        {
            Kernel = new StandardKernel();
            AddBindings();
        }

        public object GetService(Type serviceType)
        {
            return Kernel.TryGet(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return Kernel.GetAll(serviceType);
        }

        private void AddBindings()
        {
            Kernel.Bind<IProductProvider>().To<ProductProvider>();
            Kernel.Bind <IObjectMapper>().To<ObjectMapper>();
            Kernel.Bind<ILogger>().To<FileLogger>();
            Kernel.Bind<IErrorHandler>().To<ErrorHandler>();
        }
    }
}