from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
# Create your views here.
from .models import Automail
from user_auth.models import Account
from .forms import AutomailForm
from .functions import  sendEmailPostCard
from .mail_templates import mail_templates_base


@login_required
def index(request):
	mails = Automail.objects.filter(user__id__contains=request.user.id)
	return render(request, 'automail/index.html', {'mails':mails})

@login_required
def delete_email(request, id):
	Automail.objects.get(id=id).delete()
	return redirect("../")
	
@login_required
def view_email(request, id):
	try:
		email = Automail.objects.get(user__id__contains=request.user.id, id=id)
		form = AutomailForm(instance=email)
	except:
		form = AutomailForm()
		email = False
	try:
		user_account = Account.objects.get(user=request.user.id)
		auto_password = user_account.auto_password
		config_mail = user_account.config_mail
	except:
		auto_password = "Query DoesNotExist"
		config_mail = "Query DoesNotExist"

	if(request.method == 'POST'):
		try:
			form = AutomailForm(request.POST, instance=email)
		except:
			form = AutomailForm(request.POST)
		if(form.is_valid()):
				emailData = {'from_email':request.user.email,'to_email':form.cleaned_data["to_email"]
				,'subject':form.cleaned_data["subject"],'content':form.cleaned_data["content"]}
				passw = form.cleaned_data["password"]
				save_or_subm = form.cleaned_data["save_or_submit"]
				form.save()
				if (save_or_subm == "submit"):
					if (auto_password == "Query DoesNotExist"):
						send_email = sendEmailPostCard(emailData)
					elif (auto_password == True):
						send_email = sendEmailPostCard(emailData,user_account.smtp_server,user_account.port_server,user_account.host_user,
									user_account.host_password,user_account.require_tls, user_account.config_mail)
					else:
						send_email = sendEmailPostCard(emailData,user_account.smtp_server,user_account.port_server,user_account.host_user,
									passw,user_account.require_tls, user_account.config_mail)
					if (send_email == "SUCESSFULL"):
						print()
						return render(request, 'automail/success_email.html', {})
					else:
						print()
						return render(request, 'automail/email_error.html', {})
				return redirect('../')

	base,template = mail_templates_base(type)
	return render(request, 'automail/create_mail.html', {'base':base,'template':template,'form':form, 'email':email, "auto_password":auto_password, "config_mail":config_mail})
