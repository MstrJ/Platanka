namespace PlatankaAPI.Services
{
    public interface IMailService
    {
        Task<bool> SendMail(string title, string text, string email);
    }
}