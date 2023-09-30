using System;
using MongoDB.Driver;
using PlatankaAPI.Models;

namespace PlatankaAPI.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly IMongoCollection<Category> _categories;
        public CategoriesService(IMongoClient client)
        {
            var mongoDatabase = client.GetDatabase("Platanka");
            _categories = mongoDatabase.GetCollection<Category>("Categories");
        }


        private async Task<Category> GetCategoryAsync(string id)
        {
            return await _categories.Find(x => x._Id.Equals(id)).FirstOrDefaultAsync();
        }

        public async Task<Category> CreateCategory(string name)
        {
            if (string.IsNullOrWhiteSpace(name)) return null;
            var obj = new Category
            {
                Name = name
            };
            await _categories.InsertOneAsync(obj);
            return obj;
        }

        public async Task<Category> GetCategory(string id)
        {
            var obj = await GetCategoryAsync(id);
            return obj;
        }
        public async Task<IEnumerable<Category>> GetCategories()
        {
            var obj = await _categories.Find(_ => true).ToListAsync();
            return obj;
        }
        public async Task<bool> Delete(string id)
        {
            var obj = await GetCategoryAsync(id);
            if (obj == null) return false;
            await _categories.DeleteOneAsync(x => x._Id.Equals(id));
            return true;
        }

        public async Task<bool> Patch(Category category)
        {
            await _categories.FindOneAndReplaceAsync(x => x._Id.Equals(category._Id), category);
            return true;
        }
    }
}

