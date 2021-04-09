using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ProductShop.Models
{
    public class EditProductViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="Title is mandatory.")]
        public decimal Price { get; set; }
        [Required(ErrorMessage ="Price is mandatory.")]
        [MaxLength(200, ErrorMessage ="Invalid Title Length Max Size Allowed 200 Characters")]
        public string Title { get; set; }
        [Required(ErrorMessage ="Image path is mandatory.")]
        public string ImagePath { get; set; }
        [Required(ErrorMessage = "Description  is mandatory.")]
        public string Description { get; set; }
    }
}