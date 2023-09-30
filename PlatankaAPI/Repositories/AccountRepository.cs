using System;
using System.ComponentModel;
using System.Runtime.Serialization;
using System.Security;
using System.Security.Cryptography;
using System.Security.Principal;
using MailKit.Net.Smtp;
using MimeKit;
using Models;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using PlatankaAPI.Models;
using PlatankaAPI.Models.Enums;
using PlatankaAPI.Services;

namespace Repositories
{
    
    public class AccountsRepository : IAccountsRepository
    {

        private readonly IMongoCollection<Account> _accountCollection;
        private ICodeService _codeService;

        public AccountsRepository(IMongoClient client,ICodeService codeService)
        {
            _codeService = codeService;
            var mongoDatabase = client.GetDatabase("Platanka");

            _accountCollection = mongoDatabase.GetCollection<Account>("Accounts");

        }

        public async Task<Account> GetAccount(string email)
        {
            return await GetAccountBy(Field.email, email);
        }

        public async Task<IEnumerable<Account>> GetAccounts(Roles? type)
        {

            switch (type)
            {
                case Roles.All:
                    return await _accountCollection.Find(_ => true).ToListAsync();
                case Roles.Creator:
                    return await _accountCollection.Find(x => x.Permission.Role.Equals("Creator")).ToListAsync();
                case Roles.Admin:
                    return await _accountCollection.Find(x => x.Permission.Level>=2).ToListAsync();
                default:
                    return await _accountCollection.Find(x => x.Permission.Role.Equals("User")).ToListAsync();
            }

        }
        public string HashPassword(string password, byte[] salt)
        {
            using (var bcrypt = new Rfc2898DeriveBytes(password, salt, 10000))
            {
                byte[] hash = bcrypt.GetBytes(20);
                return Convert.ToBase64String(hash);
            }
        }


        public async Task<(Account,CreateAccountResult)> AddAccountMethod(Account account)
        {
            try
            {
                bool isAccountExist = await _accountCollection.Find(x => x.Email.Equals(account.Email)).FirstOrDefaultAsync()==null?false:true;

                
                // TODO improve this code, bcs code is shit
                if (isAccountExist) return (null, CreateAccountResult.ExistingEmailinDB);

      
                var r = await _codeService.SendVerificationCodeAndEmail("Weryfikacja Adresu Email",account.Email);
                if (!r.Item1) return (null, r.Item2);
                
                await _accountCollection.InsertOneAsync(account);

                return (account,r.Item2);

            }
            catch (Exception ex)
            {
                return (null, CreateAccountResult.FailToCreate);
            }
        }
        public async Task<bool> VerifyPassword(string inputPassword, string hashedPassword, byte[] salt)
        {   
            string hashedInputPassword = HashPassword(inputPassword, salt);

            bool isPasswordMatch = hashedInputPassword.Equals(hashedPassword);

            return isPasswordMatch;
        }

        private async Task<Account> GetAccountBy(Field searchBy,string value)
        {
            Account? obj;

            switch (searchBy)
            {
                case Field.email:
                    obj = await _accountCollection.Find(x => x.Email.Equals(value)).FirstOrDefaultAsync();
                    break;
                case Field._Id:
                    obj = await _accountCollection.Find(x => x._Id.Equals(value)).FirstOrDefaultAsync();
                    break;
                default:
                    obj = null;
                    break;
            }
            return obj;

        }

        private async Task<bool> PutAccount(Field searchBy,string searchValue, Account valuesToChange)
        {
            switch (searchBy)
            {
                case Field.email:
                    await _accountCollection.FindOneAndReplaceAsync(x => x.Email.Equals(valuesToChange.Email), valuesToChange);
                    return true;
                case Field._Id:
                    await _accountCollection.FindOneAndReplaceAsync(x => x._Id.Equals(valuesToChange._Id), valuesToChange);
                    return true;
                default:
                    return false;
            }
            

        }


        public async Task<Account> AccountLoginByProviders(string email)
        {
            var account = await GetAccountBy(Field.email, email);
            account.UserActivity.LastLogin = DateTime.UtcNow;
            await PutAccount(Field.email, account.Email, account);
            return account;
        }


        public async Task<(Account account, LoginResult result)> AccountLogin(string email, string password)
        {
            var account = await GetAccountBy(Field.email, email);

            if (account == null)
            {
                return (null, LoginResult.AccountNotFound);
            }

            var isPasswordValid = await VerifyPassword(password, account.Password, account.Salt);

            if (!isPasswordValid)
            {
                return (null, LoginResult.InvalidPassword);
            }
            account.UserActivity.LastLogin = DateTime.UtcNow;
            await PutAccount(Field.email, account.Email, account);
            return (account, LoginResult.Success);
        }


        public async Task<CodeAuthorizationResult> MailAuthorization(string email,int code)
        {
            var r = await  _codeService.CodeAuthorization(code, email);

            if (r == CodeAuthorizationResult.Success)
            {
                var obj = await GetAccountBy(Field.email, email);
                obj.Email_Authorization = true;
                await PutAccount(Field.email, obj.Email, obj);
            }
            return r;

        }


        public async Task<PermissionRolesResult> ChangePermissionsBy(string Changer_Id,Field searchBy,string value,Roles roles)
        {
            var changer = await GetAccountBy(Field._Id, Changer_Id);
            if (changer.Permission.Level < 2) return PermissionRolesResult.Unauthorized;
            var obj = await GetAccountBy(searchBy, value);

            if (changer.Permission.Level <= obj.Permission.Level) return PermissionRolesResult.Unauthorized;

            if (obj.Permission.Role.Equals(roles.ToString())) return PermissionRolesResult.NothingChanged;

            switch (roles)
            {
                case Roles.Creator:
                    obj.Permission.Level = 1;
                    obj.Permission.Role = "Creator";
                    break;
                case Roles.Admin:
                    obj.Permission.Level = 2;
                    obj.Permission.Role = "Admin";
                    break;
                default:
                    obj.Permission.Level = 0;
                    obj.Permission.Role = "User";
                    break;

            }
            await PutAccount(Field._Id, obj._Id, obj);
            return PermissionRolesResult.Success;
        }
        public async Task<bool> ChangePassword(string email,string newpassword)
        {
            var obj = await GetAccountBy(Field.email, email);

            var hashedPassword = HashPassword(newpassword, obj.Salt);
            try
            {
                obj.Password = hashedPassword;
                await PutAccount(Field._Id, obj._Id, obj);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        } 

    }
}
