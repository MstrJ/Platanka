using PlatankaAPI.Models;
using PlatankaAPI.Models.DTO;

namespace PlatankaAPI.Services
{
    public interface IPostsService
    {
        Task<Post> AddNewPost(PostDTO postDTO);
        Task<Post> GetPostById(string id);
        Task<IEnumerable<Post>> GetPosts(bool? active, List<string>? category);
        Task<bool> UpdatePost(Post newpost);
        Task<bool> Delete(string id);
        Task<bool> ChangeActivity(string id);
    }
}