using Models;
using PlatankaAPI.Models;
using PlatankaAPI.Models.Enums;
using static Repositories.AccountsRepository;

namespace Repositories
{
    public interface IAccountsRepository
    {
        Task<(Account, CreateAccountResult)> AddAccountMethod(Account account);
         string HashPassword(string password, byte[] salt);
        Task<(Account account, LoginResult result)> AccountLogin(string email, string password);
        Task<CodeAuthorizationResult> MailAuthorization(string email, int code);
        Task<IEnumerable<Account>> GetAccounts(Roles? type);
        Task<bool> ChangePassword(string email, string newpassword);
        Task<Account> AccountLoginByProviders(string email);
         Task<Account> GetAccount(string email);
        Task<PermissionRolesResult> ChangePermissionsBy(string Changer_Id, Field searchBy, string value, Roles roles);
    }
}