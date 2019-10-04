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
            var user = _authService.Authenticate(userInfo.Username, userInfo.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [Authorize]
        [HttpGet("test")]
        public IActionResult Test()
        {
            string id = User.Identity.Name;
            return Ok(id);
        }

        [HttpGet("forgot")]
        public IActionResult ForgotPassword()
        {
            this._authService.ForgotPassword("nfb");
            return Ok();
        }
    }
}