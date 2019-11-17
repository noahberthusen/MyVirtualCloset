using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MyVirtualCloset.Core.Clothes;
using MyVirtualCloset.Core.DB;
using MyVirtualCloset.Infrastructure.ProgramUser;
using System.Linq;

[TestClass]
public class ClothingItemControllerTest
{
    Mock<DataContext> mockContext;
    Mock<DbSet<ClothingItem>> mockSet;

    [TestInitialize]
    public void TestInitialize()
    {
        this.mockSet = new Mock<DbSet<ClothingItem>>();
        this.mockContext = new Mock<DataContext>();
    }
    [TestMethod]
    public void TestGoodResponse()

    {
        var data = new ClothingItem[]
        {
                new ClothingItem
                {
                    name = "tshirt",
                    tags = "shirt;blue;"
                }
        }.AsQueryable();


        this.mockSet.As<IQueryable<ClothingItem>>().Setup(m => m.Provider).Returns(data.Provider);
        this.mockSet.As<IQueryable<ClothingItem>>().Setup(m => m.Expression).Returns(data.Expression);
        this.mockSet.As<IQueryable<ClothingItem>>().Setup(m => m.ElementType).Returns(data.ElementType);
        this.mockSet.As<IQueryable<ClothingItem>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());


        this.mockContext.Setup(c => c.ClothingItem).Returns(this.mockSet.Object);
        var service = new ClothingService(mockContext.Object);

