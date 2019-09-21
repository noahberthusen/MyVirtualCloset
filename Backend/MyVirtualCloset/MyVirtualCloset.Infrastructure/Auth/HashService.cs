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

        public static byte[] GetHash(string password, byte[] salt)
        {
            Rfc2898DeriveBytes rfc = new Rfc2898DeriveBytes(password, salt, HashIter);
            byte[] hash = rfc.GetBytes(HashSize);
            return hash;
        }

        public static byte[] GetSalt()
        {
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            byte[] buff = new byte[SaltSize];
            rng.GetBytes(buff);
            return buff;
        }

        public static bool VerifyHash(string password, byte[] salt, byte[] hash)
        {
            Rfc2898DeriveBytes rfc = new Rfc2898DeriveBytes(password, salt, HashIter);
            byte[] test = rfc.GetBytes(HashSize);
            for (int i = 0; i < HashSize; i++)
                if (test[i] != hash[i])
                    return false;
            return true;
        }
    }
}
