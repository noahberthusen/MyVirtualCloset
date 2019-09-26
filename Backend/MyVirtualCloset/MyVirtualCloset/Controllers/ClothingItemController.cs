using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using MyVirtualCloset.Core.Clothes;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

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

        //[Authorize]
        [HttpPost("add")]
        public IActionResult addImage([FromForm(Name = "file")] IFormFile file, [FromForm(Name = "tags")] string tags, [FromForm(Name = "name")] string name)
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

            return Ok();
        }

        //[Authorize]
        [HttpGet("viewAllUserClothes")]
        public List<ReturnImage> viewAllUserClothes()
        {

            var clothes = _clothingService.viewClothesIdByUser(User.Identity.Name);

            var temp = new ReturnImage();
            var re = new List<ReturnImage>();

            foreach(var i in clothes)
            {
                temp.name = i.name;
                temp.tags = i.tags;
                var path = i.id;
                var uploads = Path.Combine(_hostingEnvironment.ContentRootPath, "uploads");
                var filePath = Path.Combine(uploads, path);
                temp.image = System.IO.File.ReadAllBytes(filePath);
                re.Add(temp);
            }

            return re;
        }
    }
}
