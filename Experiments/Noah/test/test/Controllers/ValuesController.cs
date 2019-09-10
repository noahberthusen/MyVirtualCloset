using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Emgu.CV;
using Emgu.CV.CvEnum;
using Emgu.CV.Structure;


namespace test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            String win = "test window";
            CvInvoke.NamedWindow(win);

            Mat img = new Mat(200, 400, DepthType.Cv8U, 3);
            img.SetTo(new Bgr(255, 0, 0).MCvScalar);

            CvInvoke.PutText(
                img,
                "hello, world",
                new System.Drawing.Point(10, 80),
                FontFace.HersheyComplex,
                1.0,
                new Bgr(0, 255, 0).MCvScalar);

            CvInvoke.Imshow(win, img);
            CvInvoke.WaitKey(0);
            CvInvoke.DestroyWindow(win);
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
