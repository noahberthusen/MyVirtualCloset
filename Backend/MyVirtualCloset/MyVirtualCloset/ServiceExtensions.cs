using Microsoft.Extensions.DependencyInjection;

namespace MyVirtualCloset.Api
{
    public static class ServiceExtensions
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddTransient<Core.Auth.IAuthService, Infrastructure.Auth.AuthService>();

            services.AddTransient<Core.DB.IDBService, Infrastructure.DB.DBServices>();

            return services;
        }
    }
}
