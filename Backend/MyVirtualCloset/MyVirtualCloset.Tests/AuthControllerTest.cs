using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MyVirtualCloset.Api.Controllers;
using MyVirtualCloset.Core.Auth;
using MyVirtualCloset.Core.ProgramUser;
using MyVirtualCloset.Infrastructure.ProgramUser;
using System;
using System.Net;

namespace MyVirtualCloset.Tests
{
    [TestClass]
    public class AuthControllerTest
    {
        Mock<IAuthService> mock;
        AuthController uc;

        [TestInitialize]
        public void TestInitialize()
        {
            this.mock = new Mock<IAuthService>();
            this.uc = new AuthController(mock.Object);
        }
        [TestMethod]
        public void TestGoodResponse()
        {
            var testuser = new User();

            mock.Setup(x => x.Authenticate(It.IsAny<String>(), It.IsAny<String>())).Returns(testuser);

            Assert.IsInstanceOfType(uc.Login(testuser), typeof(OkObjectResult));
        }

        [TestMethod]
        public void TestThrewException()
        {
            var testuser = new User();

            mock.Setup(x => x.Authenticate(It.IsAny<String>(), It.IsAny<String>())).Throws(new Exception("test"));

            Assert.IsInstanceOfType(uc.Login(testuser), typeof(BadRequestObjectResult));
        }
    }
}
