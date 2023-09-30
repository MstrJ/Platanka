using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models
{
    public class Account
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _Id { get; set; }
        [BsonElement("Email")]
        public string Email { get; set; }
        [BsonElement("First_Name")]
        public string First_Name { get; set; }
        [BsonElement("Last_Name")]
        public string Last_Name { get; set; }
        [BsonElement("Password")]
        public string Password { get; set; }
        [BsonElement("Salt")]
        public byte[] Salt { get; set; }
        [BsonElement("Email_Authorization")]
        public bool Email_Authorization { get; set; } = false;
        [BsonElement("UserActivity")]
        public UserActivity UserActivity { get; set; }
        [BsonElement("Permission")]
        public Permission Permission { get; set; }
        [BsonElement("FromProvider")]
        public string FromProvider { get; set; } = "";
    }

    public class Permission
    {
        [BsonElement("Role")]
        public string Role { get; set; }
        [BsonElement("Level")]
        public int Level { get; set; }
    }

    public class UserActivity
    {
        [BsonElement("AccountCreated")]
        public DateTime AccountCreated { get; set; }
        [BsonElement("LastLogin")]
        public DateTime? LastLogin { get; set; } = null;
    }
}

