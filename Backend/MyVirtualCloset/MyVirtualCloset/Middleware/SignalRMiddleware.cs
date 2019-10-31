using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyVirtualCloset.Api
{
    public class SignalRMiddleware
    {
        private readonly RequestDelegate _next;

        public SignalRMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var request = context.Request;

            if (request.Path.StartsWithSegments("/hub", StringComparison.OrdinalIgnoreCase) &&
                request.Query.TryGetValue("access_token", out var accessToken))
            {
                request.Headers.Add("Authorization", $"Bearer { accessToken }");
            }

            await _next(context);
        }
    }
}
