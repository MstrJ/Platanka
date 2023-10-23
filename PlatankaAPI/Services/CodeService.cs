using System;
using MailKit;
using Models;
using MongoDB.Driver;
using PlatankaAPI.Models;
using PlatankaAPI.Repositories;
using PlatankaAPI.Models.Enums;
using Repositories;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;
using MongoDB.Bson;

namespace PlatankaAPI.Services
{
    public class CodeService : ICodeService
    {
        private readonly IMongoCollection<TempAccountsCode> _tempAccountsCodes;
        private IMailService _mailService;

        public CodeService(IMailService mailService, IMongoClient client)
        {
            _mailService = mailService;
            var mongoDatabase = client.GetDatabase("Platanka");
            _tempAccountsCodes = mongoDatabase.GetCollection<TempAccountsCode>("TempAccountsCodes");
        }


        public int ConfirmCodeGenerator()
        {
            Random random = new Random();
            return random.Next(1000, 9999);
        }
        public async Task<bool> DeleteTempCode(string email)
        {
            try
            {
                await _tempAccountsCodes.DeleteManyAsync(x => x.Email.Equals(email));
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public string GetWeryfikacjaText(string codeTitle, int code)
        {
            int[] resultcode = new int[4];
            string numberString = code.ToString();

            for (int i = 0; i < 4; i++)
            {
                resultcode[i] = int.Parse(numberString[i].ToString());
            }
            string txt = $" <table\n      style=\"\n        background-image: url('https://cdn.discordapp.com/attachments/429588515022569472/1112485598628954112/flowers.jpg');\n        background-position: center;\n        background-repeat: no-repeat;\n        background-size: contain;\n        width: 300px;\n        padding: 0px 10px 20px 10px;\n        border-radius: 5px;\n      \"\n    >\n      <tr>\n        <tr>\n          <td colspan=\"4\" style=\"text-align: center\">\n            <h3 style=\"color: white; background-color: #ad3962; border-radius: 1px;font-family: sans-serif;\">\n              {codeTitle}\n            </h3>\n          </td>\n        </tr>\n        <td colspan=\"4\" style=\"text-align: center\">\n          <img\n            src=\"https://cdn.discordapp.com/attachments/429588515022569472/1112375907504640090/platanka2.png\"\n            alt=\"\"\n            style=\"height: 200px; width: 200px\"\n          />\n        </td>\n      </tr>\n      <tr>\n        <td\n          style=\"\n            font-family: sans-serif;\n            font-size: 44px;\n            background-color: #ad3962;\n            color: white;\n            margin: 0px 0px;\n            padding: 5px 0px;\n            border-radius: 5px;\n            text-align: center;\n          \"\n        >\n          {resultcode[0]}\n        </td>\n        <td\n          style=\"\n            font-family: sans-serif;\n            font-size: 44px;\n            background-color: #ad3962;\n            margin: 0px 0px;\n            color: white;\n            padding: 5px 0px;\n            text-align: center;\n            border-radius: 5px;\n          \"\n        >\n          {resultcode[1]}\n        </td>\n        <td\n          style=\"\n            font-family: sans-serif;\n            font-size: 44px;\n            background-color: #ad3962;\n            color: white;\n            margin: 0px 0px;\n            padding: 5px 0px;\n            border-radius: 5px;\n            text-align: center;\n          \"\n        >\n          {resultcode[2]}\n        </td>\n        <td\n          style=\"\n            font-family: sans-serif;\n            font-size: 44px;\n            background-color: #ad3962;\n            color: white;\n            margin: 0px 0px;\n            padding: 5px 0px;\n            border-radius: 5px;\n            text-align: center;\n          \"\n        >\n          {resultcode[3]}\n        </td>\n      </tr>\n      <tr>\n        <td colspan=\"4\" style=\"text-align: center;color: white;\">\n          <p>\n              .\n          </p>\n        </td>\n      </tr>\n    </table>";
            return txt;
        }
        public async Task<int> AccountSendCode(string email)
        {

            try
            {
                int code = ConfirmCodeGenerator();
                var anyCodeExist = _tempAccountsCodes.Find(x => x.Email.Equals(email)) == null ? false : true;
                if (anyCodeExist) await DeleteTempCode(email);
                
                var tempcode = new TempAccountsCode() { Email = email, Code = code };
                await _tempAccountsCodes.InsertOneAsync(tempcode);

                return code;

            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public async Task<(bool, CreateAccountResult)> SendVerificationCodeAndEmail(string title, string email)
        {
            int code = await AccountSendCode(email);

            if (code == 0)
            {
                return (false, CreateAccountResult.FailToCreate);
            }

            var result = await _mailService.SendMail($"Platanka {title}", GetWeryfikacjaText(title, code), email);

            if (!result)
            {
                return (false, CreateAccountResult.NotExistingEmail);
            }

            return (true, CreateAccountResult.Success);
        }

        public async Task<CodeAuthorizationResult> CodeAuthorization(int code, string email)
        {
            var tempAccountCode = _tempAccountsCodes.Find(_ => true).ToList().FirstOrDefault(x => x.Email.Equals(email));
            if (tempAccountCode == null) return CodeAuthorizationResult.UserNotFound;


            if (!tempAccountCode.Code.Equals(code))
            {
                return CodeAuthorizationResult.InvalidCode;
            }
            await DeleteTempCode(email);
            return CodeAuthorizationResult.Success;
        }


      
    }
}

