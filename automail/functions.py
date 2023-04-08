import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def sendEmailPostCard(emailData,smtp_server = None,port_server = None,host_user = None,host_password = None,require_tls = None
	, config_mail = None):

	for x in range(0,3):
		try:
			if config_mail ==  "forward" or config_mail == None: #configure, None, forward
					from myProject.settings import (EMAIL_HOST,EMAIL_PORT,EMAIL_HOST_USER,EMAIL_HOST_PASSWORD,EMAIL_USE_TLS)
					smtp_server = 'smtp-mail.outlook.com'#EMAIL_HOST
					port_server = EMAIL_PORT
					host_user = EMAIL_HOST_USER
					host_password = EMAIL_HOST_PASSWORD
					require_tls = EMAIL_USE_TLS
			else:
				pass
			server = smtplib.SMTP(smtp_server,port_server,timeout=10)
			if (require_tls):
				server.ehlo()
				server.starttls()
				server.login(host_user, host_password)


				#CORPO DO EMAIL

				body = emailData['content']

				email_msg = MIMEMultipart()
				if config_mail ==  "forward" or config_mail == None:
					email_msg['From'] = EMAIL_HOST_USER
					email_msg['To'] = emailData['from_email']
				else:
					email_msg['From'] = emailData['from_email']
					email_msg['To'] = emailData['to_email']

				email_msg['Subject'] = emailData['subject']
				email_msg.attach(MIMEText(body,'html'))




				#ENVIANDO EMAIL
				server.sendmail(email_msg['From'],email_msg['To'],email_msg.as_string())
				server.quit()
				return "SUCESSFULL"

		except:
			if (x < 2):
				pass
			else:
				return "ERROR"

