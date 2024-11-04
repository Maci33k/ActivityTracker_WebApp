using ActivityTrackerAPI.Services;
using System;
using System.Net;
using System.Net.Mail;
using System.Web;

public class EmailService
{
		private readonly IConfiguration _configuration;
		private readonly ILogger<EmailService> _logger;
		private readonly TokenService _tokenService;


	public EmailService(IConfiguration configuration, ILogger<EmailService> logger, TokenService tokenService) 
	{
		_configuration = configuration;
		_logger = logger;
		_tokenService = tokenService;
	}

    public void SendVerificationEmail(string toEmail, string token)
    {
        var smtpHost = _configuration["Smtp:Host"];
        var smtpPort = int.Parse(_configuration["Smtp:Port"]);
        var smtpUser = _configuration["Smtp:Username"];
        var smtpPass = _configuration["Smtp:Password"];

        var encodedToken = HttpUtility.UrlEncode(token);
        var verificationLink = $"https://localhost:7217/api/Verification/verify?token={encodedToken}";

        var message = new MailMessage
        {
            From = new MailAddress(smtpUser),
            Subject = "Email Verification",
            Body = $"Zweryfikuj swój email klikając w link: {verificationLink}",
            IsBodyHtml = true
        };
        message.To.Add(new MailAddress(toEmail));

        using (var client = new SmtpClient(smtpHost, smtpPort))
        {
            client.Credentials = new NetworkCredential(smtpUser, smtpPass);
            client.EnableSsl = true;
            client.Send(message);
        }
    }
}
