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
    public class UserControllerTest
    {
        Mock<IUserService> mock;
        UserController uc;

        [TestInitialize]
        public void TestInitialize()
        {
             this.mock = new Mock<IUserService>();
             this.uc = new UserController(mock.Object);
        }
        [TestMethod]
        public void TestGoodResponse()
        {
            var us = new User();
            var re = new User();
            mock.Setup(x => x.Create(It.IsAny<User>())).Returns(re);
            
            Assert.IsInstanceOfType(uc.Register(us), typeof(OkObjectResult));

        }

        [TestMethod]
        public void TestThrowExecption()
        {
            var us = new User();
            var re = new User();

            mock.Setup(x => x.Create(It.IsAny<User>())).Throws(new Exception("test"));

            Assert.IsInstanceOfType(uc.Register(us), typeof(BadRequestObjectResult));

        }


    }
}
