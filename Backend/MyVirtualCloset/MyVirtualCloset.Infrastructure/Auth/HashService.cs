using MyVirtualCloset.Core.Auth;
using System.Security.Cryptography;
using System.Text;

namespace MyVirtualCloset.Infrastructure.Auth
{
    public static class HashService
    {
        private const int SaltSize = 16;
        private const int HashSize = 20;
        private const int HashIter = 5000;

        public static string GetHash(string password, byte[] salt)
        {
            Rfc2898DeriveBytes rfc = new Rfc2898DeriveBytes(password, salt, HashIter);
            byte[] hash = rfc.GetBytes(HashSize);
            return Encoding.ASCII.GetString(hash);
        }

        public static string GetSalt()
        {
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            byte[] buff = new byte[SaltSize];
            rng.GetBytes(buff);
            return Encoding.ASCII.GetString(buff);
        }

        public static bool VerifyHash(string password, string saltStr, string hashStr)
        {
            byte[] salt = Encoding.ASCII.GetBytes(saltStr);
            byte[] hash = Encoding.ASCII.GetBytes(hashStr);

            Rfc2898DeriveBytes rfc = new Rfc2898DeriveBytes(password, salt, HashIter);
            byte[] test = rfc.GetBytes(HashSize);
            for (int i = 0; i < HashSize; i++)
                if (test[i] != hash[i])
                    return false;
            return true;
        }
    }
}
