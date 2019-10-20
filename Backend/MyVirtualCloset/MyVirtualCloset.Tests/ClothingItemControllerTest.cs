using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MyVirtualCloset.Api.Controllers;
using MyVirtualCloset.Core.Auth;
using MyVirtualCloset.Core.Clothes;
using MyVirtualCloset.Core.DB;
using MyVirtualCloset.Core.ProgramUser;
using MyVirtualCloset.Infrastructure.ProgramUser;
using System;
using System.Linq;
using System.Net;

namespace MyVirtualCloset.Tests
{
    [TestClass]
    public class ClothingItemControllerTest
    {
        Mock<DbContext> mock;

        [TestInitialize]
        public void TestInitialize()
        {
            this.mock = new Mock<DbContext>();
        }
        [TestMethod]
        public void TestGoodResponse()

        {
            var fakeCustomers = new ClothingItem[]
            {
                new ClothingItem() ,
                new ClothingItem()
            };
            var test = fakeCustomers.AsQueryable();


            var mockedContext = new Mock<DataContext>();
            mockedContext.Setup(c => c.ClothingItem.Where(x => x.user == "test")).Returns(test);

            var t = new ClothingService(mockedContext.Object);

        }
    }
}
