using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Emgu.CV;
using Emgu.CV.CvEnum;
using Emgu.CV.Util;
using Microsoft.AspNetCore.Http;
using Emgu.CV.Structure;

namespace test.Controllers
{
    [Route("api/values")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet("image")]
        public ActionResult<IEnumerable<string>> Get()
        {
            String win = "test window";

            Mat img = CvInvoke.Imread("C:/Users/nfberthusen/Downloads/shirt.jpg");
            Mat edges = new Mat();
            Mat thresh = new Mat();
            CvInvoke.Threshold(img, thresh, 225, 255, ThresholdType.Binary);

            double largest_area = 0;
            int largest_contour_index = 0;
            VectorOfPoint largetsContour;

            CvInvoke.Canny(thresh, edges, 225, 250);
            using (VectorOfVectorOfPoint contours = new VectorOfVectorOfPoint())
            {
                CvInvoke.FindContours(edges, contours, null, RetrType.List, ChainApproxMethod.ChainApproxSimple);
                int count = contours.Size;

                for (int i = 0; i < count; i++)
                {
                    using (VectorOfPoint contour = contours[i])
                    using (VectorOfPoint approxContour = new VectorOfPoint())
                    {
                        CvInvoke.ApproxPolyDP(contour, approxContour, CvInvoke.ArcLength(contour, true) * 0.05, true);
                        CvInvoke.DrawContours(thresh, contours, i, new MCvScalar(0, 255, 0), 3);
                        CvInvoke.Imshow("screen", thresh);
                        CvInvoke.WaitKey(0);
                    }
                }

                CvInvoke.NamedWindow(win);
                CvInvoke.Imshow(win, edges);
                CvInvoke.WaitKey(0);
                CvInvoke.DestroyWindow(win);


            }


            CvInvoke.NamedWindow(win);
            CvInvoke.Imshow(win, edges);
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
        public void Post([FromBody] IFormFile file)
        {
            Console.WriteLine(file.FileName);
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
