using Microsoft.AspNetCore.Mvc;
using PlatankaAPI.Models.obj;

namespace PlatankaAPI.Services
{
    public interface IImageService
    {
        Task<bool> AddImage(IFormFile file,string description);
        Task<(byte[], string)> GetImage(string id);
        //Task<Image> GetImage(string id);
        Task<IEnumerable<Image>> GetImages();
        Task<bool> Delete(string id);
    }
}