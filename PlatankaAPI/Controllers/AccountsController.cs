using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using PlatankaAPI.Models;
using PlatankaAPI.Models.DTO;
using PlatankaAPI.Models.Enums;
using PlatankaAPI.Services;
using Services;
using Sprache;
using static Repositories.AccountsRepository;

namespace PlatankaAPI.Controllers
{
    [Route("api/Accounts")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ICodeService _codeService;
        public AccountsController(IAccountService accountService,ICodeService codeService)
        {
            _accountService = accountService;
            _codeService = codeService;
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<Account>> GetAccount(string email)
        {
            var obj = await _accountService.GetAccount(email);

            if(obj!=null) return Ok(obj);
            return BadRequest("not existing email");
        }

        // get
        [HttpGet("Type/{role}")]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts(Roles? role)
        {
            return Ok(await _accountService.GetAccounts(role));
        }

        // post
        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser(AccountDTO accountDTO,string confirmpassword)
        {
            if (!accountDTO.Password.Equals(confirmpassword)) return BadRequest("password is not matching with confirmpassword");
            var obj = await _accountService.AddAccountMethod(accountDTO);

            switch (obj.Item2)
            {
                case CreateAccountResult.Success:
                    return Ok(obj.Item1);
                case CreateAccountResult.ExistingEmailinDB:
                    return NotFound("Account with existing email found in the database");
                case CreateAccountResult.IncorrectPasswordValid:
                    return BadRequest("Invalid new password (at least 5 letters, without ., , etc)");
                case CreateAccountResult.NotExistingEmail:
                    return BadRequest("Account with non-existing email");
                case CreateAccountResult.FailToCreate:
                    return StatusCode(500, "Failed to create account");
                default:
                    return StatusCode(500);
            }
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginRequest)
        {
            var obj = await _accountService.LoginToAccount(loginRequest.Email, loginRequest.Password);

            switch (obj.result)
            {
                case LoginResult.Success:
                    return Ok(obj.account);
                case LoginResult.AccountNotFound:
                    return NotFound("Account not found");
                case LoginResult.InvalidPassword:
                    return BadRequest($"Invalid password");
                default:
                    return StatusCode(500);
            }
        }

        [HttpPatch("LoginByProviders/{email}")]
        public async Task<ActionResult<Account>> AccountLoginByProviders(string email)
        {
            var obj = await _accountService.AccountLoginByProviders(email);
            if (obj == null) return BadRequest("not existing");
            return Ok(obj);

        }
        [HttpPost("SendCode/{email}")]
        public async Task<ActionResult> SendCode(string title,string email)
        {
            var r = await _codeService.SendVerificationCodeAndEmail(title, email);
            
            switch (r.Item2)
            {
                case CreateAccountResult.Success:
                    return Ok("Sended code");
                case CreateAccountResult.NotExistingEmail:
                    return BadRequest("Email does not exist");
                case CreateAccountResult.FailToCreate:
                    return BadRequest("Failed to send a code");
                default:
                    return BadRequest("Unknown error during code creation");
            }

        }


        //todo usprawnij przedmioty w query
        [HttpPatch("AuthorizationEmail/{email}")]
        public async Task<ActionResult> MailAuthorization(string email,int code)
        {
            var result = await _accountService.MailAuthorization(email, code);

            switch (result)
            {
                case CodeAuthorizationResult.Success:
                    return Ok("Correct Authorization");
                case CodeAuthorizationResult.InvalidCode:
                    return BadRequest("Invalid authorization code");
                case CodeAuthorizationResult.CodeExpired:
                    return BadRequest("Authorization code has expired");
                case CodeAuthorizationResult.UserNotFound:
                    return BadRequest("User not found");
                case CodeAuthorizationResult.InternalServerError:
                    return StatusCode(500, "Internal Server Error");
                default:
                    return BadRequest("Unknown error during authorization");
            }


        }
        [HttpPatch("ChangePermission")]
        public async Task<ActionResult<bool>> ChangePermission(string changerId,Field searchBy,string valueSearched,Roles roles)
        {
            var obj = await _accountService.ChangePermissionsBy(changerId, searchBy, valueSearched, roles);


            switch (obj)
            {
                case PermissionRolesResult.Success:
                    return Ok("Changed");
                case PermissionRolesResult.NothingChanged:
                    return NoContent();
                case PermissionRolesResult.Unauthorized:
                    return Unauthorized("No permissions");
                default:
                    return StatusCode(500);
            }
        }
        [HttpPatch("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO changePasswordDTO)
        {
            var result = await _accountService.ChangePassword(changePasswordDTO);
            switch (result)
            {
                case ChangePasswordResult.Success:
                    return Ok("Password changed");
                case ChangePasswordResult.InvalidNewPassword:
                    return BadRequest("Invalid new password");
                case ChangePasswordResult.PasswordsNotMatching:
                    return BadRequest("Passwords do not match");
                case ChangePasswordResult.Error:
                    return StatusCode(500, "An error occurred while changing the password");
                default:
                    return StatusCode(500, "Unknown error occurred");
            }

        }

    }
}
