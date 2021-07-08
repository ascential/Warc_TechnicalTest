using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Reflection;

namespace ProductShopApp.Infrastructure
{
    // Allow deserialization to properties with private setters
    public class PrivateResolver : DefaultContractResolver
    {
        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            var prop = base.CreateProperty(member, memberSerialization);
            if (!prop.Writable)
            {
                var property = member as PropertyInfo;
                prop.Writable = property?.GetSetMethod(true) != null;
            }
            return prop;
        }
    }
}
