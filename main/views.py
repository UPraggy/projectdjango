from django.shortcuts import render, redirect

# Create your views here.

def index(response):
	if not response.user.is_authenticated:
		return redirect('/accounts/login/')
	else:
		context = {
		'user' : response.user,
		}
		return render(response, 'main/index.html', context)



