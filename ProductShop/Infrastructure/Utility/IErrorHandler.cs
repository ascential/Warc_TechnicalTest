using System;

namespace ProductShop.Infrastructure.Utility
{
    public interface IErrorHandler
    {
        Exception ManageError(Exception ex);
    }
}