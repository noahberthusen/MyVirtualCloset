using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyVirtualCloset.Core.Companions;
using MyVirtualCloset.Core.ProgramUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyVirtualCloset.Api.Controllers
{
    /// <summary>
    /// Controller for CRUD operations on companions
    /// </summary>
    [Route("api/Companion")]
    [ApiController]
    public class CompanionController : Controller
    {
        private readonly ICompanionService _companionService;

        public CompanionController(ICompanionService companionService)
        {
            _companionService = companionService;
        }

        /// <summary>
        /// Adds a companions by userID (GUID)
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("add")]
        public IActionResult addCompanion([FromBody] string user)
        {
            try
            {
                _companionService.addCompanion(User.Identity.Name, user);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok();
        }

        /// <summary>
        /// Adds a companion by username
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("addByUsername")]
        public IActionResult addCompanionByUsername([FromBody] string username)
        {
            try
            {
                _companionService.addCompanionByUsername(User.Identity.Name, username);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok();
        }

        /// <summary>
        /// Gets all companions for a given user
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPost("all")]
        public async Task<IActionResult> getAllCompanions([FromBody] string user)
        {
            List<User> companions = new List<User>();
            try
            {
                companions = await _companionService.getAllCompanions(user);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok(companions);
        }

        [Authorize]
        [HttpPost("remove")]
        public IActionResult removeCompanion([FromBody] string user)
        {
            try
            {
                _companionService.removeCompanion(User.Identity.Name, user);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok();
        }
    }
}
