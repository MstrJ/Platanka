using System.Threading.Tasks;
using PlatankaAPI.Models.Enums;

namespace PlatankaAPI.Services
{
    public interface ICodeService
    {
        Task<int> AccountSendCode(string email);
        int ConfirmCodeGenerator();
        Task<bool> DeleteTempCode(string email);
        Task<CodeAuthorizationResult> CodeAuthorization(int code, string email);
        string GetWeryfikacjaText(string codeTitle, int code);
        //Task<(bool, CreateAccountResult)> SendingCodeEmail(string title,string email);
        Task<(bool, CreateAccountResult)> SendVerificationCodeAndEmail(string title, string email);



    }
}