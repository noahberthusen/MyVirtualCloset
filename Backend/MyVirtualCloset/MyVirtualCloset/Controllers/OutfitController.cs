using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyVirtualCloset.Core.Outfits;

namespace MyVirtualCloset.Api.Controllers
{
    [Route("api/Outfit")]
    [ApiController]
    public class OutfitController : Controller
    {
        private readonly IOutfitService _outfitService;
        public OutfitController(IOutfitService outfitService)
        {
            this._outfitService = outfitService;
        }

        [Authorize]
        [HttpPost("create")]
        public IActionResult CreateOutfit([FromForm(Name = "name")] String name)
        {
            var re = _outfitService.createOutfit(User.Identity.Name, name);
            return Ok(re);
        }

        [Authorize]
        [HttpPost("addTo")]
        public IActionResult addToOutfit([FromForm(Name = "outfitId")] String outfitId, [FromForm(Name = "itemId")] String itemId)
        {
            _outfitService.addItemToOutfit(outfitId, itemId);
            return Ok();
        }

        [Authorize]
        [HttpPost("removeFrom")]
        public IActionResult removeFromOutfit([FromForm(Name = "outfitId")] String outfitId, [FromForm(Name = "itemId")] String itemId)
        {
            _outfitService.removeItemFromOutfit(outfitId, itemId);
            return Ok();
        }

        [Authorize]
        [HttpGet("viewByUser")]
        public List<Outfit> viewOutfits([FromForm(Name = "outfitId")] String outfitId)
        {

            return _outfitService.viewOutfit(outfitId);
        }

        [Authorize]
        [HttpGet("viewOutfit")]
        public List<List<Outfit>> viewUserOutfits()
        {
            return _outfitService.viewOutfitsByUser(User.Identity.Name);
        }
    }
}