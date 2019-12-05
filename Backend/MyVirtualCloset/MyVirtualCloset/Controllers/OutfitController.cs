using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
        public IActionResult CreateOutfit([FromBody] Outfit outfit)
        {
            Outfit newOutfit = new Outfit();
            try
            {
                newOutfit = _outfitService.createOutfit(User.Identity.Name, outfit);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok(newOutfit);
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
            try
            {
                _outfitService.addItemToOutfit(outfitId, itemId);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
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
            try
            {
                _outfitService.removeItemFromOutfit(outfitId, itemId);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok();
        }

        /// <summary>
        /// Removes base outfit and all clothing items from outfit
        /// </summary>
        /// <param name="outfitId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("deleteOutfit")]
        public IActionResult deleteOutfit([FromForm(Name = "outfitId")] String outfitId)
        {
            try
            {
                _outfitService.deleteOutfit(outfitId);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
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
        public IActionResult viewOutfits([FromForm(Name = "outfitId")] String outfitId)
        {
            List<Outfit> outfit = new List<Outfit>();
            try
            {
                outfit = _outfitService.viewOutfit(outfitId);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok(outfit);
        }


        /// <summary>
        /// Returns all outfits from a specific user. Should only be used when accessing your own profile
        /// </summary>
        /// <returns></returns>
        /// <remarks></remarks>
        [Authorize]
        [HttpGet("viewByUser")]
        public IActionResult viewUserOutfits()
        {
            List<List<Outfit>> outfits = new List<List<Outfit>>();
            try
            {
                outfits = _outfitService.viewOutfitsByUser(User.Identity.Name);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok(outfits);
        }

        /// <summary>
        /// Returns all outfits that are public. Should be used when viewing profiles other than the current user.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("viewPublicByUser")]
        public IActionResult viewPublicUserOutfits([FromBody] string user)
        {
            List<List<Outfit>> outfits = new List<List<Outfit>>();
            try
            {
                outfits = _outfitService.viewPublicOutfitsByUser(user);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok(outfits);
        }

        /// <summary>
        /// Returns list of all outfits that should be displayed in the user's feed
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("viewFeed")]
        public async Task<IActionResult> viewFollowingOutfits()
        {
            List<List<Outfit>> feed = new List<List<Outfit>>();
            try
            {
                feed = await _outfitService.viewFollowingOutfits(User.Identity.Name);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok(feed);
        }

        [Authorize]
        [HttpPost("likeOutfit")]
        public IActionResult getLikesList([FromForm(Name = "key")] string key)
        {
            _outfitService.likeOutfit(key);
            return Ok();
        }

        [Authorize]
        [HttpPost("getLikes")]
        public likes getLikes([FromForm(Name = "key")] string key)
        {
            return _outfitService.getsLikes(key);
        }

        [Authorize]
        [HttpPost("getLikesList")]
        public List<likes> getLikesList([FromBody] List<List<Outfit>> outfits)
        {
            return _outfitService.getLikesList(outfits);
        }
    }
}