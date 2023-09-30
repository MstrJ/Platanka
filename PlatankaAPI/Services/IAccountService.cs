using Models;
using PlatankaAPI.Models;
using PlatankaAPI.Models.DTO;
using PlatankaAPI.Models.Enums;
using static Repositories.AccountsRepository;

namespace Services
{
    public interface IAccountService
    {
        Task<(Account, CreateAccountResult)> AddAccountMethod(AccountDTO accountDTO);
        Task<(Account account, LoginResult result)> LoginToAccount(string email, string password);
        Task<CodeAuthorizationResult> MailAuthorization(string email, int code);
        Task<IEnumerable<Account>> GetAccounts(Roles? type);
        Task<Account> AccountLoginByProviders(string email);
         Task<Account> GetAccount(string email);
        Task<ChangePasswordResult> ChangePassword(ChangePasswordDTO changePasswordDTO);
        //Task<bool> SendMail(string title, string text, string email);
        Task<PermissionRolesResult> ChangePermissionsBy(string Changer_Id, Field searchBy, string value, Roles roles);
    }
}