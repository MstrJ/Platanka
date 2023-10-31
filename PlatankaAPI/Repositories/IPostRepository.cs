using PlatankaAPI.Models;

namespace PlatankaAPI.Repositories
{
    public interface IPostRepository
    {
        Task<Post> AddNewPost(Post newPost);
        Task<Post> GetPostById(string id);
        Task<IEnumerable<Post>> GetPosts(bool? active, List<string>? category);
        Task<bool> UpdatePost(Post newpost);
        Task<bool> Delete(string id);
        Task<bool> ChangeActivity(string id);
    }
}