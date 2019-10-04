using MyVirtualCloset.Core.ProgramUser;

namespace MyVirtualCloset.Core.Auth
{
    public interface IAuthService
    {
        User Authenticate(string username, string password);
        void ForgotPassword(string username);
        void ChangePassword(string username, string password, string token);
    }
}
