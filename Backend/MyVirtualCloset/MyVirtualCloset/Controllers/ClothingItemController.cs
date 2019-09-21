using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using MyVirtualCloset.Core.Clothes;

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
            var filePath = Path.Combine(uploads, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            _clothingService.addClothes(filePath, tags, name);

            //file.SaveAs(filePath);
            return Ok();
        }
    }
}
