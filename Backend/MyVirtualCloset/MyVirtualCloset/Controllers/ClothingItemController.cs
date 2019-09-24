using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using MyVirtualCloset.Core.Clothes;
using System;
using System.Collections.Generic;

namespace MyVirtualCloset.Api.Controllers
{
    [Route("api/ClothingItem")]
    [ApiController]
    public class ClothingItemController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IClothingService _clothingService;

        public ClothingItemController(IHostingEnvironment environment, IClothingService clothingService)
        {
            this._hostingEnvironment = environment;
            this._clothingService = clothingService;
        }

        [HttpPost("add")]
        public IActionResult imageTest([FromForm(Name = "file")] IFormFile file, [FromForm(Name = "tags")] string tags, [FromForm(Name = "name")] string name)
        {
            var uploads = Path.Combine(_hostingEnvironment.ContentRootPath, "uploads");
            Guid guid = Guid.NewGuid();
            var id = guid.ToString();
            var filePath = Path.Combine(uploads, id);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            _clothingService.addClothes(id, tags, name, User.Identity.Name);

            //file.SaveAs(filePath);
            return Ok();
        }

        [HttpGet("view")]
        public IActionResult viewimage()
        {
            var path = _clothingService.viewClothes("139efe16-2900-41a2-809a-1b8465485b69");
            var uploads = Path.Combine(_hostingEnvironment.ContentRootPath, "uploads");
            var filePath = Path.Combine(uploads, path);
            Byte[] b = System.IO.File.ReadAllBytes(filePath);
            return File(b, "image/jpeg");
        }

        [HttpGet("test")]
        public List<ReturnImage> test()
        {
            var a = new ReturnImage();
            var path = _clothingService.viewClothes("139efe16-2900-41a2-809a-1b8465485b69");
            var uploads = Path.Combine(_hostingEnvironment.ContentRootPath, "uploads");
            var filePath = Path.Combine(uploads, path);
            a.image = System.IO.File.ReadAllBytes(filePath);
            a.name = "test";
            var l = new List<ReturnImage>();
            l.Add(a);

            return l;
        }
    }
}
