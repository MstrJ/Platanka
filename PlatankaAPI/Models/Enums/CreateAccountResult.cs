using System;
namespace PlatankaAPI.Models.Enums
{
    public enum CreateAccountResult
    {
        Success,
        ExistingEmailinDB,
        NotExistingEmail,
        IncorrectPasswordValid,
        FailToCreate,
    }

}

