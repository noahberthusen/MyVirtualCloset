using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            } catch (Exception e)
            {
                Console.WriteLine("there was an error");
            }
            return Ok(user);
        }
    }
}