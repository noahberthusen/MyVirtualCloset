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
    /// <summary>
    /// Controller containing all end points related to authorization and passwords.
    /// </summary>
    /// <remarks></remarks>
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            this._authService = authService;
        }

        /// <summary>
        /// Login to gennerate token for user.
        /// </summary>
        /// <param name="userInfo"></param>
        /// <returns></returns>
        /// <remarks></remarks>
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

        /// <summary>
        /// Function for testing durning devlopment.
        /// </summary>
        /// <returns></returns>
        /// <remarks></remarks>
        [Authorize]
        [HttpGet("test")]
        public IActionResult Test()
        {
            string id = User.Identity.Name;
            return Ok(id);
        }

        /// <summary>
        /// Sends user email to change password.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <remarks></remarks>
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

        /// <summary>
        /// Changes password for user.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <remarks></remarks>
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