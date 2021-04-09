using System.Reflection;

namespace ProductShop.Mapper
{
    public class ObjectMapper : IObjectMapper
    {
        public void Map<T,G>(T source, G target)
        {
            foreach (PropertyInfo propertyInfo in typeof(T).GetProperties())
            {
                typeof(G)
                    .GetProperty(propertyInfo.Name,
                        BindingFlags.IgnoreCase |
                        BindingFlags.Instance |
                        BindingFlags.Public)
                    .SetValue(target,
                        propertyInfo.GetValue(source));
            }
        }
    }
}