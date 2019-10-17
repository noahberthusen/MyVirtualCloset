using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MyVirtualCloset.Api.Controllers;
using MyVirtualCloset.Core.ProgramUser;
using MyVirtualCloset.Infrastructure.ProgramUser;


namespace MyVirtualCloset.Tests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            var mock = new Mock<IUserService>();
            var us = new User();
            var re = new User();
            mock.Setup(x => x.Create(It.IsAny<User>())).Returns(re);
            var uc = new UserController(mock.Object);

            uc.Register(us);
            Assert.AreEqual(1, 1);

        }
    }
}
