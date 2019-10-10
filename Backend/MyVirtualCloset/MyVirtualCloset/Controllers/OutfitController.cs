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
        public IActionResult CreateOutfit()
        {

            return Ok();
        }

        [Authorize]
        [HttpPost("addTo")]
        public IActionResult addToOutfit()
        {

            return Ok();
        }

        [Authorize]
        [HttpPost("removeFrom")]
        public IActionResult removeFromOutfit()
        {

            return Ok();
        }

        [Authorize]
        [HttpGet("viewByUser")]
        public IActionResult viewUserOutfits()
        {

            return Ok();
        }

        [Authorize]
        [HttpGet("viewOutfit")]
        public IActionResult viewoutfit()
        {

            return Ok();
        }
    }
}