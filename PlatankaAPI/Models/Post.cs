using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PlatankaAPI.Models
{
    public class Post
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _Id { get; set; }

        [BsonElement("Title")]
        public string Title { get; set; }

        // enum here
        [BsonElement("Category")]
        public string Category { get; set; }

        [BsonElement("Active")]
        public bool Active { get; set; }

        [BsonElement("Description")]
        public string Description { get; set; }

        [BsonElement("Price")]
        public float Price { get; set; }

        [BsonElement("ImagesIds")]
        public string[] ImagesIds { get; set; }

        [BsonElement("UploadDate")]
        public DateTime UploadDate {get; set;}
    }

}