using System;
namespace PlatankaAPI.Models.DTO
{
	public class ChangePasswordDTO
	{
		public string email { get; set; }
		public string NewPassword { get; set; }
		public string ConfirmPassword { get; set; }
    }
}

