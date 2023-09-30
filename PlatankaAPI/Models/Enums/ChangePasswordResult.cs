using System;
namespace PlatankaAPI.Models.Enums
{
    public enum ChangePasswordResult
    {
        Success,
        PasswordsNotMatching,
        InvalidNewPassword,
        Error
    }
}

