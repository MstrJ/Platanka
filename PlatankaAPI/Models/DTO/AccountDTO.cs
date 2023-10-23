using System;
using MongoDB.Bson.Serialization.Attributes;

namespace PlatankaAPI.Models.DTO
{
	public class AccountDTO
	{
        public string Email { get; set; }

        public string First_Name { get; set; }

        public string Last_Name { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }

        public List<string> Providers { get; set; }

    }
}

