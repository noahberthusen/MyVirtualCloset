using MyVirtualCloset.Core.ImagePreprocessing;
using System;
using Emgu.CV;
using Emgu.CV.CvEnum;
using Emgu.CV.Util;

namespace MyVirtualCloset.Infrastructure.ImagePreprocessing
{
    public class ImagePreprocessing : IImagePreprocessing
    {
        public byte[] process(byte[] image)
        {
            String win = "test window";

            Mat img = new Mat();
            CvInvoke.Imdecode(image, ImreadModes.Unchanged, img);

            Mat edges = new Mat();

            CvInvoke.Canny(img, edges, 100, 200);
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
                        if (CvInvoke.ContourArea(approxContour, false) > 250)
                        {
                            Console.WriteLine(approxContour.Size);
                        }
                    }
                }

                CvInvoke.NamedWindow(win);
                CvInvoke.Imshow(win, edges);
                CvInvoke.WaitKey(0);
                CvInvoke.DestroyWindow(win);
            }

            return null;
        }
    }
}
