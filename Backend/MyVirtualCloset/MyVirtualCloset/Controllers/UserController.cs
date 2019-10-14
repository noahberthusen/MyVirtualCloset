using System;
using Microsoft.AspNetCore.Mvc;
using MyVirtualCloset.Core.ProgramUser;

namespace MyVirtualCloset.Api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

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


    }
}