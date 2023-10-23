using System;
using Models;
using MongoDB.Driver;
using PlatankaAPI.Models;

namespace PlatankaAPI.Repositories
{
    public class TempAccountsRepository : ITempAccountsRepository
    {
        private readonly IMongoCollection<Account> _tempAccountCollection;
        public TempAccountsRepository(IMongoClient client)
        {
            var mongoDatabase = client.GetDatabase("Platanka");
            _tempAccountCollection = mongoDatabase.GetCollection<Account>("TempAccounts");
        }

        public async Task<Account> GetAccount(string email)
        {
            var obj = await _tempAccountCollection.Find(x => x.Email.Equals(email)).FirstOrDefaultAsync();
            return obj;
        }


        public async Task<bool> DeleteTempAccount(string email)
        {
            try
            {
                await _tempAccountCollection.DeleteManyAsync(x => x.Email.Equals(email));
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    
       public async Task<bool> AddTempAccount(Account account)
        {
            try
            {
                var obj = await GetAccount(account.Email) == null ? false:true;
                if (obj) await DeleteTempAccount(account.Email);

                await _tempAccountCollection.InsertOneAsync(account);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }
    }
}

