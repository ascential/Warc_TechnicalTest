using ProductShopBusinessLayer;
using ProductShopDataLayer;
using ProductShopDataObjects.Classes;
using Unity;

namespace ProductShop
{
    public class DependencyProvider
    {
        private static readonly IUnityContainer Container = new UnityContainer();

        static DependencyProvider()
        {
            Container.RegisterType<ProductShopDataModel>(TypeLifetime.PerResolve);
            Container.RegisterType<IProductProvider, ProductProvider>();
        }

        public static T Get<T>() 
        {
            var resolved = Container.Resolve<T>();
            return resolved;
        }
    }
}