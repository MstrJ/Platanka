using System;
namespace Models
{
	public class PlatankaSecrets
    {

        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string Accounts { get; set; } = null!;
        public string Posts { get; set; } = null!;

        public string SMTPMAIL { get; set; } = null!;
        public string MAILPASSWORD { get; set; } = null!;


    }
}


