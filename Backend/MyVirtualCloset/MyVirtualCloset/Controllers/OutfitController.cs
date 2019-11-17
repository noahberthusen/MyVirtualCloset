using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyVirtualCloset.Core.Outfits;

namespace MyVirtualCloset.Api.Controllers
{
    /// <summary>
    /// Controller for CRUD operations on outfits.
    /// </summary>
    /// <remarks></remarks>
    [Route("api/Outfit")]
    [ApiController]
    public class OutfitController : Controller
    {
        private readonly IOutfitService _outfitService;
        public OutfitController(IOutfitService outfitService)
        {
            this._outfitService = outfitService;
        }

        /// <summary>
        /// Creats a blank outfit with a given name.
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        [Authorize]
        [HttpPost("create")]
        public IActionResult CreateOutfit([FromForm(Name = "name")] String name)
        {
            var re = _outfitService.createOutfit(User.Identity.Name, name);
            return Ok(re);
        }

        /// <summary>
        /// Adds the given clothing item to the given outfit.
        /// </summary>
        /// <param name="outfitId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        [Authorize]
        [HttpPost("addTo")]
        public IActionResult addToOutfit([FromForm(Name = "outfitId")] String outfitId, [FromForm(Name = "itemId")] String itemId)
        {
            _outfitService.addItemToOutfit(outfitId, itemId);
            return Ok();
        }

        /// <summary>
        /// Removes the given clothing item from the given outfit.
        /// </summary>
        /// <param name="outfitId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        [Authorize]
        [HttpPost("removeFrom")]
        public IActionResult removeFromOutfit([FromForm(Name = "outfitId")] String outfitId, [FromForm(Name = "itemId")] String itemId)
        {
            _outfitService.removeItemFromOutfit(outfitId, itemId);
            return Ok();
        }


        [Authorize]
        [HttpPost("deleteOutfit")]
        public IActionResult deleteOutfit([FromForm(Name = "outfitId")] String outfitId)
        {
            _outfitService.deleteOutfit(outfitId);
            return Ok();
        }

        /// <summary>
        /// Returns a specific selected outfit.
        /// </summary>
        /// <param name="outfitId"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        [Authorize]
        [HttpPost("viewOutfit")]
        public List<Outfit> viewOutfits([FromForm(Name = "outfitId")] String outfitId)
        {

            return _outfitService.viewOutfit(outfitId);
        }


        /// <summary>
        /// Returns all outfits from a specific user.
        /// </summary>
        /// <returns></returns>
        /// <remarks></remarks>
        [Authorize]
        [HttpGet("viewByUser")]
        public List<List<Outfit>> viewUserOutfits()
        {
            return _outfitService.viewOutfitsByUser(User.Identity.Name);
        }
    }
}