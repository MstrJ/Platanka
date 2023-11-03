using System;
using System.Security.Cryptography;
using Models;
using PlatankaAPI.Models;
using PlatankaAPI.Models.DTO;
using PlatankaAPI.Models.Enums;
using PlatankaAPI.Services;
using Repositories;

namespace Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountsRepository _accountRepository;
        //private readonly IMailService _mailService;
        public AccountService(IAccountsRepository accountsRepository)
        {
            _accountRepository = accountsRepository;
            //_mailService = mailService;
        }
        public async Task<bool> DeleteAccount(string id)
        {
            return await _accountRepository.DeleteAccount(id);
        }
        public async Task<bool> AddProvider(string email, string provider)
        {
            return await _accountRepository.AddProvider(email, provider);
        }
        public async Task<bool> DeleteProvider(string email, string provider)
        {
            return await _accountRepository.DeleteProvider(email, provider);
        }

        public async Task<CodeAuthorizationResult> CodeVerify(string email, int code)
        {
            return await _accountRepository.CodeVerify(email,code);
        }

        public async Task<Account> GetAccount(string email)
        {
            return await _accountRepository.GetAccount(email);
        }

        public async Task<Account> AccountLoginByProviders(string email)
        {
            return await _accountRepository.AccountLoginByProviders(email);
        }

        public async Task<(Account,CreateAccountResult)> AddAccountMethod(AccountDTO accountDTO, bool addAsTemp)
        {
 
            if (addAsTemp)
            {
                if(string.IsNullOrEmpty(accountDTO.Password) || string.IsNullOrEmpty(accountDTO.ConfirmPassword)) return (null, CreateAccountResult.FailToCreate);
            }
            byte[] salt = GenerateSalt();
            string hashedPassword = _accountRepository.HashPassword(accountDTO.Password, salt);
            var obj = new Account
            {
                Email = accountDTO.Email,
                First_Name = accountDTO.First_Name,
                Last_Name = accountDTO.Last_Name,
                Password = !addAsTemp ? null : hashedPassword,
                Salt = !addAsTemp ? null: salt,
                Email_Authorization = addAsTemp ? false:true,
                Permission = new Permission { Level = 0, Role = "User" },
                UserActivity = new UserActivity { AccountCreated = DateTime.UtcNow, LastLogin = null },
                Providers = accountDTO.Providers.ToList().Select(x=>x.ToUpper()).ToList(),
                _Id = null
            };
            return await _accountRepository.AddAccountMethod(obj, addAsTemp);
        }
        public async Task<IEnumerable<Account>> GetAccounts(Roles? type)
        {
            return await _accountRepository.GetAccounts(type);
        }
        public async Task<(Account account, LoginResult result)> LoginToAccount(string email,string password)
        {
            var obj = await _accountRepository.AccountLogin(email, password);
            return (obj.account,obj.result);
        }

        private byte[] GenerateSalt()
        {
            byte[] salt = new byte[16];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        public async Task<CodeAuthorizationResult> MailAuthorization(string email, int code)
        {
            return await _accountRepository.MailAuthorization(email,code);
        }
        public async Task<PermissionRolesResult> ChangePermissionsBy(string Changer_Id, Field searchBy, string value, Roles roles)
        {
            return await _accountRepository.ChangePermissionsBy(Changer_Id,searchBy, value, roles);
        }
        public async Task<ChangePasswordResult> ChangePassword(ChangePasswordDTO changePasswordDTO)
        {
            if (!changePasswordDTO.ConfirmPassword.Equals(changePasswordDTO.NewPassword)) return ChangePasswordResult.PasswordsNotMatching;

            var result = await _accountRepository.ChangePassword(changePasswordDTO.email, changePasswordDTO.NewPassword);
            if (!result) return ChangePasswordResult.Error;


            // TODO fix ui / add new sendmail z textcontext add !!!
            //if (result) await _mailService.SendMail("Zmiana Hasła", $"{changePasswordDTO.email} zostało zmienione hasło",changePasswordDTO.email);
            return ChangePasswordResult.Success;
        }
        

    }
}

