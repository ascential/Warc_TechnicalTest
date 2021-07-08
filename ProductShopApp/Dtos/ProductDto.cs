using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductShopApp.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
        public string Title { get; set; }
        public string ImagePath { get; set; }
        public string Description { get; set; }
    }
}
