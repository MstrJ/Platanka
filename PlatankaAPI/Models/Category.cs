using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PlatankaAPI.Models
{
	public class Category
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _Id { get; set; }
        [BsonElement("Name")]
        public string Name { get; set; }
    }
}

