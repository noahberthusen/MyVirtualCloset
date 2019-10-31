using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyVirtualCloset.Api.Controllers
{
    [Authorize]
    public class MessageHub : Hub
    {
        public static readonly ConcurrentDictionary<string, string> Users = new ConcurrentDictionary<string, string>();

        public override Task OnConnectedAsync()
        {
            string userName = Context.User.Identity.Name;
            string connectionId = Context.ConnectionId;
            Console.WriteLine("Username", userName);
            Console.WriteLine("cid", connectionId);

            var user = Users.GetOrAdd(userName, connectionId);

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            string userName = Context.User.Identity.Name;
            string connectionId = Context.ConnectionId;

            string cid;
            Users.TryGetValue(userName, out cid);

            if (cid != null)
            {
                Users.TryRemove(userName, out _);
            }
            return base.OnDisconnectedAsync(exception);
        }

        public void Send(string message, string to)
        {
            Clients.All.SendAsync("notification", "Hello!");
            return;
            string cid;
            if (Users.TryGetValue(to, out cid))
            {
                string sender = Context.User.Identity.Name;
           
                Clients.All.SendAsync("notification", "hello!");
                // actually send message
                //Clients.Client(cid).SendAsync("hello!");
            }
        }
    }
}
