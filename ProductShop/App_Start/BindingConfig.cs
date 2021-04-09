using Ninject.Modules;
using ProductShopBusinessLayer;
using ProductShopDataObjects.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductShop.App_Start
{
    public class BindingConfig : NinjectModule
    {
        public override void Load()
        {
            Bind<IProductProvider>().To<ProductProvider>();
        }
    }
}