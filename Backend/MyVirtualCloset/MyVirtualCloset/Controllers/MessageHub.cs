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
            string cid;
            if (Users.TryGetValue(to, out cid))
            {
                Console.WriteLine(cid);
                string sender = Context.User.Identity.Name;
                Clients.Client(cid).SendAsync("notification", message);
            }
        }
    }
}
