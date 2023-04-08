from django.shortcuts import render, redirect

# Create your views here.
'''accounts/login/'''
def index(response):
	if not response.user.is_authenticated:
		return redirect('/portifolio')
	else:
		context = {
		'user' : response.user,
		}
		return render(response, 'main/index.html', context)

def portifolio(response):
	context = {}
	return render(response, 'main/portifolio.html', context)
	
def projetos(response):
	context = {}
	return render(response, 'main/projetos.html', context)

def projetos_view(response, type_project = "default"):
	if (type_project == "food_dev"):
		return render(response, 'main/projetos/food_dev.html', {})
	elif (type_project == "chat"):
		return render(response, 'main/projetos/chat.html', {})
	elif (type_project == "automail"):
		return render(response, 'main/projetos/automail.html', {})
	else: #(type_project == "datascience"):
		return render(response, 'main/projetos/chess.html', {})
		
def apresentacoes(response):
		return render(response, 'main/apresentacoes.html', {})

def apresentacoes_view(response, type_presentation = "default"):
	try:
		if (type_presentation != "default"):
			return render(response, f'main/apresentacoes/{type_presentation}.html', {})
		else: 
			return render(response, 'main/apresentacoes/DATA.html', {})
	except:
		return redirect("../apresentacoes")


def documentacoes(response):
	doc = response.GET.get('doc','none')
	img = response.GET.get('img','none')
	if (doc == "none"):
		return render(response, 'main/documentations/index.html', {})
	else:
		return render(response, f'main/documentations/document.html', {"doc":doc, "img": img})

def docs(response, type_documentation = "default"):
	return render(response, f'main/documentations/{type_documentation}', {"TEMP":"temp"})



def sobre(response):
	context = {}
	return render(response, 'main/sobre.html', context)


def contato(response):
	context = {}
	return render(response, 'main/contato.html', context)

def teste_sprite(response):
	context = {}
	return render(response, 'main/teste_sprite.html', context)