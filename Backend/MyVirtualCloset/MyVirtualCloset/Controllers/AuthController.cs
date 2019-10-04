using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MyVirtualCloset.Core.Auth;
using MyVirtualCloset.Core.ProgramUser;

namespace MyVirtualCloset.Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            this._authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User userInfo)
        {
            User user = userInfo;
            try
            {
                user = _authService.Authenticate(userInfo.Username, userInfo.Password);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }

            return Ok(user);
        }

        [Authorize]
        [HttpGet("test")]
        public IActionResult Test()
        {
            string id = User.Identity.Name;
            return Ok(id);
        }

        [HttpPost("forgot")]
        public IActionResult ForgotPassword([FromBody] User user)
        {
            try
            {
                _authService.ForgotPassword(user.Username);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }

            return Ok();
        }

        [HttpPost("reset")]
        public IActionResult ChangePassword([FromBody] User user)
        {
            try
            {
                _authService.ChangePassword(user.Username, user.Password, user.Id);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }

            return Ok();
        }
    }
}