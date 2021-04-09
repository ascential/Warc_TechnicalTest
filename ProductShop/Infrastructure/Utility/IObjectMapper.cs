namespace ProductShop.Mapper
{
    public interface IObjectMapper
    {
         void Map <T, G> (T source, G target);
    }
}