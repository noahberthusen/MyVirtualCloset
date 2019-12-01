using Microsoft.Extensions.DependencyInjection;

namespace MyVirtualCloset.Api
{
    public static class ServiceExtensions
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddTransient<Core.Auth.IAuthService, Infrastructure.Auth.AuthService>();
            services.AddTransient<Core.ProgramUser.IUserService, Infrastructure.ProgramUser.UserService>();
            services.AddTransient<Core.Clothes.IClothingService, Infrastructure.ProgramUser.ClothingService>();
            services.AddTransient<Core.Outfits.IOutfitService, Infrastructure.Outfits.OutfitService>();
            services.AddTransient<Core.Companions.ICompanionService, Infrastructure.Companions.CompanionService>();

            return services;
        }
    }
}
