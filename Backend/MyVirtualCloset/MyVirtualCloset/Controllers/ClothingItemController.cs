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
    /// <summary>
    /// Controller for CRUD operations on clothing items.
    /// </summary>
    /// <remarks></remarks>
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

        /// <summary>
        /// Adds a new clothing item for the current user to the database.
        /// </summary>
        /// <param name="file"></param>
        /// <param name="tags"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        [Authorize]
        [HttpPost("add")]
        public IActionResult addImage([FromForm(Name = "file")] IFormFile file, [FromForm(Name = "tags")] string tags, [FromForm(Name = "name")] string name)
        {
            Guid guid = Guid.NewGuid();
            var id = guid.ToString();
            var filePath = Path.Combine(_hostingEnvironment.ContentRootPath, id);



            var bytes = default(byte[]);
            using (var stream = new MemoryStream())
            {
                file.CopyTo(stream);
                bytes = stream.ToArray();
            }

            _clothingService.addClothes(id, tags, name, User.Identity.Name, bytes);

            return Ok();
        }

        /// <summary>
        /// Returns all the clothes that have been added to the database for that spafic user.
        /// </summary>
        /// <returns></returns>
        /// <remarks></remarks>
        [Authorize]
        [HttpGet("viewAllUserClothes")]
        public List<ClothingItem> viewAllUserClothes()
        {
            var clothes = _clothingService.viewClothesIdByUser(User.Identity.Name);
            return clothes;
        }

        /// <summary>
        /// Retuns all clothing items from a specific user containing a certin tag.
        /// </summary>
        /// <param name="tag"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        [Authorize]
        [HttpGet("search")]
        public List<ClothingItem> searchByTags([FromForm(Name = "tags")] string tag)
        {
            var re = _clothingService.searchTags(tag);
            return re;
        }

        [Authorize]
        [HttpGet("getById")]
        public IActionResult getById([FromBody] string id)
        {
            return Ok(_clothingService.getClothingItem(id));
        }

        [Authorize]
        [HttpPost("deleteItem")]
        public IActionResult deleteItem([FromForm(Name = "id")] string id)
        {
            _clothingService.deleatItem(id);
            return Ok();
        }
    }
}
