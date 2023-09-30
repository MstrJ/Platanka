using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PlatankaAPI.Models.obj
{
    public class Image
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _Id { get; set; }

        [BsonElement("FileName")]
        public string FileName { get; set; }

        [BsonElement("ContentType")]
        public string ContentType { get; set; }

        [BsonElement("Data")]
        public byte[] Data { get; set; }

        [BsonElement("Description")]
        public string Description { get; set; }

        [BsonElement("UploadDate")]
        public DateTime UploadDate { get; set; }
        
    }
}
