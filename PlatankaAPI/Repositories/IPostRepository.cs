using PlatankaAPI.Models;

namespace PlatankaAPI.Repositories
{
    public interface IPostRepository
    {
        Task<Post> AddNewPost(Post newPost);
        Task<Post> GetPostById(string id);
        Task<IEnumerable<Post>> GetPosts();
        Task<bool> UpdatePost(Post newpost);
        Task<bool> Delete(string id);
        Task<bool> ChangeActivity(string id);
    }
}