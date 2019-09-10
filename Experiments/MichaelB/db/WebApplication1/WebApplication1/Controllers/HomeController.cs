using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment he;
        public HomeController(IHostingEnvironment e)
        {
            he = e;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult ShowFields(string fullName, IFormFile pic)
        {
            ViewData["fname"] = fullName;
            if(pic!= null)
            {
                var fileName = Path.Combine(he.WebRootPath, Path.GetFileName(pic.FileName));
                pic.CopyTo(new FileStream(fileName, FileMode.Create));
                ViewData["fileLocation"] = "/" + Path.GetFileName(pic.FileName);
            }

            return View();
        }
    }
}
