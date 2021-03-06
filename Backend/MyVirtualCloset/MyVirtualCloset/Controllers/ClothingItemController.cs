﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using MyVirtualCloset.Core.Clothes;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

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
        private readonly IClothingService _clothingService;

        public ClothingItemController(IClothingService clothingService)
        {
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

            try
            {
                var bytes = default(byte[]);
                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    bytes = stream.ToArray();
                }

                _clothingService.addClothes(id, tags, name, User.Identity.Name, bytes);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok();
        }

        /// <summary>
        /// Returns all the clothes that have been added to the database for that specific user.
        /// </summary>
        /// <returns></returns>
        /// <remarks></remarks>
        [Authorize]
        [HttpGet("viewAllUserClothes")]
        public IActionResult viewAllUserClothes()
        {
            List<ClothingItem> clothing = new List<ClothingItem>();
            try
            {
                clothing = _clothingService.viewClothesIdByUser(User.Identity.Name);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok(clothing);
        }

        /// <summary>
        /// Returns all clothing items from a specific user containing a certain tag.
        /// </summary>
        /// <param name="tag"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        [Authorize]
        [HttpPost("search")]
        public async Task<IActionResult> searchByTags([FromForm(Name = "tags")] string tag)
        {
            List<ClothingItem> clothing = new List<ClothingItem>();
            try
            {
                clothing = await _clothingService.searchTags(tag, User.Identity.Name);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok(clothing);
        }

        /// <summary>
        /// Returns information about clothingItem with id 'id'
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("getById")]
        public IActionResult getById([FromForm(Name = "id")] string id)
        {
            ClothingItem clothingItem = new ClothingItem();
            try
            {
                clothingItem = _clothingService.getClothingItem(id);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok(clothingItem);
        }

        /// <summary>
        /// Deletes a clothing item with id 'id' from the database
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("deleteItem")]
        public IActionResult deleteItem([FromForm(Name = "id")] string id)
        {
            try
            {
                _clothingService.deleteItem(id);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok();
        }
    }
}
