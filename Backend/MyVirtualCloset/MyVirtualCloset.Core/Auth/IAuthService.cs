using MyVirtualCloset.Core.ProgramUser;

namespace MyVirtualCloset.Core.Auth
{
    public interface IAuthService
    {
        User Authenticate(string username, string password);
        string ForgotPassword(string username);
    }
}
