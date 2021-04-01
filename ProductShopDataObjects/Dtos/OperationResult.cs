using System.Collections.Generic;
using System.Linq;

namespace ProductShopDataObjects.Dtos
{
    public class OperationResult
    {
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }

        public OperationResult(bool success, IEnumerable<string> errors = null)
        {
            this.Success = success;
            this.Errors = errors?.ToArray() ?? new string[0];
        }
    }

    public class OperationResult<T> : OperationResult
    {
        public T DataState { get; set; }

        public OperationResult(bool success, T dataState = default, IEnumerable<string> errors = null)
            : base(success, errors)
        {
            this.DataState = dataState;
        }
    }
}
