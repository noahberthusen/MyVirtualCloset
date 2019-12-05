using System;
using System.Collections.Generic;
using System.Text;

namespace MyVirtualCloset.Core.Outfits
{
    public class likes
    {
        [System.ComponentModel.DataAnnotations.Key]
        public string PKey { get; set; }
        public int likesNum { get; set; }

    }
}
