using System;
using Emgu.CV;
using Emgu.CV.CvEnum;
using Emgu.CV.Structure;

namespace emguCVtest
{
    class Program
    {
        static void Main(string[] args)
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
        }
    }
}
