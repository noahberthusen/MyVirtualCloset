using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MyVirtualCloset.Api.Controllers;
using MyVirtualCloset.Core.Clothes;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyVirtualCloset.Testing
{
    [TestClass]
    class ClothingItemControllerTest
    {
        Mock<IClothingService> mock;
        ClothingItemController uc;

        [TestInitialize]
        public void TestInitialize()
        {
            this.mock = new Mock<IClothingService>();
            this.uc = new ClothingItemController(mock.Object);
        }
        [TestMethod]
        public void TestGoodResponse()
        {
            var item = new ClothingItem();

            mock.Setup(x => x.getClothingItem(It.IsAny<String>())).Returns(item);

            Assert.IsInstanceOfType(uc.getById(It.IsAny<String>()), typeof(ClothingItem));
            Assert.IsInstanceOfType(uc.deleteItem(It.IsAny<String>()), typeof(OkObjectResult));
        }

        [TestMethod]
        public void TestBadResponse()
        {
            mock.Setup(x => x.searchTags(It.IsAny<string>(), It.IsAny<string>())).Throws(new Exception("test"));

            Assert.IsInstanceOfType(uc.searchByTags(It.IsAny<string>()), typeof(BadRequestObjectResult));
        }
    }
}
