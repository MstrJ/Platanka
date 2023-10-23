using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PlatankaAPI.Models
{
	public class TempAccountsCode
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _Id { get; set; }
        [BsonElement("Email")]
        public string Email { get; set; }
        [BsonElement("Code")]
        public int Code { get; set; }
        [BsonElement("CreatedAt")]
        public BsonDateTime CreatedAt { get; set; } = BsonDateTime.Create(DateTime.Now);
    }
}

