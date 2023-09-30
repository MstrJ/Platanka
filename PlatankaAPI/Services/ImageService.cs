using System;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Models;
using MongoDB.Driver;
using PlatankaAPI.Models.obj;

namespace PlatankaAPI.Services
{
    public class ImageService : IImageService
    {
        private readonly IMongoCollection<Image> _imagesColletion;
        public ImageService(IMongoClient client)
        {
            var mongoDatabase = client.GetDatabase("Platanka");

            _imagesColletion = mongoDatabase.GetCollection<Image>("Images");
        }

        public async Task<bool> AddImage(IFormFile file, string description)
        {
            if (file == null || file.Length <= 0)
            {
                return false;
            }

            byte[] imageData;
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                imageData = stream.ToArray();
            }


            var image = new Image
            {
                FileName = file.FileName,
                ContentType = file.ContentType,
                Data = imageData,
                Description = description,
                UploadDate = DateTime.UtcNow 
            };

            await _imagesColletion.InsertOneAsync(image);
            return true;

        }

        public async Task<(byte[], string)> GetImage(string id)
        {

            var image = await _imagesColletion.Find(x=>x._Id.Equals(id)).FirstOrDefaultAsync();

            if (image == null)
            {
                return (default, null);
            }
            return (image.Data, image.ContentType);
        }

        public async Task<IEnumerable<Image>> GetImages()
        {
            var images = await _imagesColletion.Find(_ => true).ToListAsync();
            return images;
        }

        public async Task<bool> Delete(string id)
        {
            var image = await _imagesColletion.Find(x => x._Id.Equals(id)).FirstOrDefaultAsync();

            if (image == null) return false;
            await _imagesColletion.FindOneAndDeleteAsync(x => x._Id.Equals(id));
            return true;

        }
    }
}

