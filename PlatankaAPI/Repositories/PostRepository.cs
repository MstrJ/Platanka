using System;
using Models;
using MongoDB.Driver;
using PlatankaAPI.Models;
using PlatankaAPI.Models.DTO;
using PlatankaAPI.Services;

namespace PlatankaAPI.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly IMongoCollection<Post> _postsCollection;
        public PostRepository(IMongoClient client)
        {
            var mongoDatabase = client.GetDatabase("Platanka");

            _postsCollection = mongoDatabase.GetCollection<Post>("Posts");
        }


        public async Task<Post> AddNewPost(Post newPost)
        {
            await _postsCollection.InsertOneAsync(newPost);
            return newPost;
        }
        public async Task<Post> GetPostById(string id)
        {
            var obj =await  _postsCollection.Find(post => post._Id.Equals(id)).FirstOrDefaultAsync();

            return obj;
        }

        public async Task<IEnumerable<Post>> GetPosts(bool? active,List<string>? category)
        {
            var lista = await _postsCollection.Find(_ => true).ToListAsync();

            if (active.HasValue) lista = lista.Where(x => x.Active == active.Value).ToList();

            if (category != null && category.Any()) lista = lista.Where(x => category.Contains(x.Category.ToLower())).ToList();

            return lista;
        }

        // zamiast bool, add enums

        public async Task<bool> UpdatePost(Post newpost)
        {
            await _postsCollection.FindOneAndReplaceAsync(x => x._Id.Equals(newpost._Id),newpost);
            return true;
        }


        public async Task<bool> Delete(string id)
        {
            var obj = _postsCollection.Find(x => x._Id.Equals(id)).FirstOrDefaultAsync();
            if (obj == null) return false;
            await _postsCollection.FindOneAndDeleteAsync(x => x._Id.Equals(id));
            return true;
        }

        public async Task<bool> ChangeActivity(string id)
        {
            var obj = await _postsCollection.Find(x => x._Id.Equals(id)).FirstOrDefaultAsync();

            if (obj==null) return false;
            
            obj.Active = !obj.Active;
            await _postsCollection.FindOneAndReplaceAsync(x => x._Id.Equals(id), obj);
            return true;
        }
    }
}

