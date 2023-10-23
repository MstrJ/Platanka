using Models;

namespace PlatankaAPI.Repositories
{
    public interface ITempAccountsRepository
    {
        Task<bool> AddTempAccount(Account account);
        Task<bool> DeleteTempAccount(string email);
        Task<Account> GetAccount(string email);
    }
}