using System;
using PlatankaAPI.Models;
using PlatankaAPI.Models.DTO;
using PlatankaAPI.Repositories;

namespace PlatankaAPI.Services
{
    public class PostsService : IPostsService
    {
        private readonly IPostRepository _postRepository;
        public PostsService(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task<Post> AddNewPost(PostDTO postDTO)
        {
            var obj = new Post
            {
                Description = postDTO.Description,
                UploadDate = DateTime.UtcNow,
                Active = true,
                Category = postDTO.Category,
                ImagesIds = postDTO.ImagesIds,
                Price = postDTO.Price,
                Title = postDTO.Title,
            };
            return await _postRepository.AddNewPost(obj);
        }

        public async Task<bool> ChangeActivity(string id)
        {
            return await _postRepository.ChangeActivity(id);
        }

        public async Task<bool> UpdatePost(Post newpost)
        {
            return await _postRepository.UpdatePost(newpost);
        }

        public async Task<bool> Delete(string id)
        {
            return await _postRepository.Delete(id);
        }

        public async Task<Post> GetPostById(string id)
        {
            return await _postRepository.GetPostById(id);
        }

        public async Task<IEnumerable<Post>> GetPosts()
        {
            return await _postRepository.GetPosts();
        }
    }
}

