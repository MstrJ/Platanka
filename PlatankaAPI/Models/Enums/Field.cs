using System;
using System.Runtime.Serialization;

namespace PlatankaAPI.Models.Enums
{
    public enum Field
    {
        [EnumMember(Value = "Email")]
        email,
        [EnumMember(Value = "_Id")]
        _Id
    }
}

