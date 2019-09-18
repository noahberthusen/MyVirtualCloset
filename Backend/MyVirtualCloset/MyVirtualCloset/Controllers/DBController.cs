using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyVirtualCloset.Core.DB;

namespace MyVirtualCloset.Api.Controllers
{

    [Route("api/db")]
    [ApiController]
    public class DBController : Controller
    {

        private new IDBService _dbs;

        public DBController(IDBService dbs)
        {
            this._dbs = dbs;
        }

        [HttpGet]
        public string test()
        {
            //_dbs.ConnectTest("Server=127.0.0.1;Database=test;Trusted_Connection=True;");
            return "TEST";
        }

        [HttpGet("test")]
        public string test2()
        {
            //_dbs.ConnectTest("datasource=127.0.0.1;port=3306;username=root;password=;database=test;sslmode=none;");
            _dbs.ConnectTest("datasource=coms-309-ks-7.misc.iastate.edu;port=3306;username=ks7;password=Password#7;database=MyVirtualCloset;");
            return "TEST";
        }

    }
}