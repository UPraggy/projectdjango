from django.shortcuts import render, redirect
from .forms import RegisterForm, RegisterChangeForm, AccountChangeForm
from .models import Account
# Create your views here.
def register(response):
	form = RegisterForm()
	if response.method == "POST":
		form = RegisterForm(response.POST)
		if form.is_valid():
			form.save()
			return redirect("../../")
	context = {
		'form' : form
	}
	return render(response, 'user_auth/register.html', context)

def register_change(response):
	user = response.user
	form = RegisterChangeForm(initial={'first_name': user.first_name,
										'last_name': user.last_name,
										'email': user.email})
	try:
		user_account = Account.objects.get(user=user.id)
		account_form = AccountChangeForm(initial={'user' : user.id,
												'config_mail':user_account.config_mail,
												'smtp_server':user_account.smtp_server,
												'port_server':user_account.port_server,
												'host_user':user_account.host_user,
												'host_password':user_account.host_password,
												'auto_password':user_account.auto_password,
												'require_tls':user_account.require_tls})
	except Exception as e: 
		#'Account matching query does not exist.'
			account_form = AccountChangeForm()
		


	if response.method == "POST":
		form = RegisterChangeForm(response.POST, instance=response.user)
		try:
			account_form = AccountChangeForm(response.POST, instance=user_account)
		except Exception as e:
			#"local variable 'user_account' referenced before assignment"
				account_form = AccountChangeForm(response.POST)
		if form.is_valid():
			account = account_form.save(commit=False)
			passw = account_form.cleaned_data["host_password"]
			if (passw == None or passw == "" or passw == False):
				account.auto_password = False
			else:
				account.auto_password = True
			passw = account_form.cleaned_data["config_mail"]
			if (passw == "forward"):
				account.auto_password = True
			elif (passw == "" or passw == None):
				account.config_mail = "forward"
			form.save()
			account_form.save()
			return redirect("../../")
	
	context = {
		'form' : form,
		'account_form' : account_form
	}
	return render(response, 'user_auth/register_complement.html', context)