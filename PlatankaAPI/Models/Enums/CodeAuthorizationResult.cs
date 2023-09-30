using System;
namespace PlatankaAPI.Models.Enums
{
    public enum CodeAuthorizationResult
    {
        Success,                 // Kod autoryzacji jest poprawny i autoryzacja udana.
        InvalidCode,             // Kod autoryzacji jest niepoprawny.
        CodeExpired,             // Kod autoryzacji wygasł.
        UserNotFound,            // Użytkownik o podanym adresie email nie został znaleziony.
        InternalServerError     // Wystąpił błąd wewnętrzny serwera.
    }

}
