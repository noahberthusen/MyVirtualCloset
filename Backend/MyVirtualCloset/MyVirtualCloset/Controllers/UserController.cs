using System;
using Microsoft.AspNetCore.Mvc;
using MyVirtualCloset.Core.ProgramUser;

namespace MyVirtualCloset.Api.Controllers
{
    /// <summary>
    /// Controller containing all endpoints for the user.
    /// </summary>
    /// <remarks></remarks>
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        /// <summary>
        /// Used to create a new user in the system.
        /// </summary>
        /// <param name="newUser"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        [HttpPost("register")]
        public IActionResult Register([FromBody] User newUser)
        {
            User user = null;

            try
            {
                user = _userService.Create(newUser);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok(user);
        }

        /// <summary>
        /// Returns the username associated with a userId.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpPost("get")]
        public IActionResult GetUserById([FromBody] string userId)
        {
            string user;
            try
            {
                user = _userService.GetUserById(userId);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
            return Ok(user);
        }


    }
}