using PlatankaAPI.Models;

namespace PlatankaAPI.Services
{
    public interface ICategoriesService
    {
        Task<bool> Delete(string id);
        Task<IEnumerable<Category>> GetCategories();
        Task<Category> GetCategory(string id);
        Task<bool> Patch(Category category);
        Task<Category> CreateCategory(string name);
    }
}