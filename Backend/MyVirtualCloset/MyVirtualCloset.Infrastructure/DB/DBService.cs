using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;
using MyVirtualCloset.Core.DB;

namespace MyVirtualCloset.Infrastructure.DB
{
    public class DBServices : IDBService
    {

        public void ConnectTest(string connectionString)
        {

            using (var client = new MySqlConnection(connectionString))
            {
                client.Open(); 
                MySqlCommand cmd = new MySqlCommand("SELECT * FROM t1", client);
                client.Close();
            }

        }

    }
}