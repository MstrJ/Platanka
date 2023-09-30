using System;
using MailKit.Net.Smtp;
using MimeKit;
using DotNetEnv;
using System.Configuration;
using Models;

namespace PlatankaAPI.Services
{
	public class MailService : IMailService
	{

		public MailService()
        {
        }


        public async Task<bool> SendMail(string title, string text, string email)
        {
            string mail = Environment.GetEnvironmentVariable("Mail")!;
            string mailPassword = Environment.GetEnvironmentVariable("MailPassword")!;
            try
            {
                var emailTask = new MimeMessage();
                emailTask.From.Add(MailboxAddress.Parse(mail));
                emailTask.To.Add(MailboxAddress.Parse(email));
                emailTask.Subject = title;

                emailTask.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = text };

                using (var smtp = new SmtpClient())
                {
                    
                    await smtp.ConnectAsync("smtp.gmail.com", 465, true);
                    await smtp.AuthenticateAsync(mail, mailPassword);
                    var messageSent = false;

                    smtp.MessageSent += (sender, args) =>
                    {
                        messageSent = true;
                    };

                    await smtp.SendAsync(emailTask);
                    await smtp.DisconnectAsync(true);

                    return messageSent;
                }
            }
            catch (SmtpCommandException ex)
            {
                if (ex.StatusCode == SmtpStatusCode.MailboxUnavailable)
                {
                    return false;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}

