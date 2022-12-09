from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Match
from .forms import MatchForm
# Create your views here.
@login_required
def chess(request):
	context = {
		
	}
	return render (request, 'chess/play.html', context)

@login_required
def search(request):
	try:
		rooms = Match.objects.filter(num_players = 1)
		return redirect(f'../waiting/{rooms[0].roomname}')
	except:
		roomname = f'{request.user.username}__vs__'
		try:
			roomName = Match.objects.get(roomname = roomname)
			return redirect(f'../waiting/{roomname}')
		except:
			Match.objects.create(roomname = roomname, player1 = f'{request.user.username}', num_players=0)
			return redirect(f'../waiting/{roomname}')

@login_required
def wait(request, slug):
		wait_time = 9000
		try: 
			roomName = Match.objects.get(roomname__contains = slug)
		except:
			'''get() returned more than one Match -- it returned 2!'''
			roomName = Match.objects.filter(roomname__contains = slug)
			for x in range(0, len(roomName)):
				roomName[x].delete()

		
		try:
			if (int(roomName.num_players) == 0):
				obj = Match.objects.get(roomname=slug)
				obj.player1 = f'{request.user.username}'
				obj.num_players = '1'
				obj.save()
			elif (int(roomName.num_players) == 1 and roomName.roomname.split('__vs__')[0] != request.user.username):
				obj = Match.objects.get(roomname=slug)
				obj.player2 = f'{request.user.username}'
				obj.num_players = '2'
				obj.save()
				wait_time = 9000
			elif (int(roomName.num_players) == 2):
				try:
					return redirect(f'../play/{slug}')
				except:
					obj = Match.objects.get(roomname__contains=slug)
					return redirect(f'../play/{slug}{obj.player2}')

		
			return render (request, 'chess/waiting_room.html', {'slug':slug, 'wait_time' : wait_time})
		except AttributeError:
			''''QuerySet' object has no attribute "num_players"'''
			return redirect(f'../waiting/')
@login_required
def play(request, slug): #5sec e apagaa
	if (slug.split("__vs__")[1] == ""):
		obj = Match.objects.get(roomname__contains=slug)
		obj.roomname = f'{slug}{obj.player2}'
		obj.save()
		
		return redirect(f'../play/{slug}{obj.player2}')
	try:
		room = Match.objects.get(roomname__contains=slug)
	except:
		return redirect(f'../../')
	context = {
		'iterator':'',
		'slug':slug,
		'actual_player' : 0,
		'player1':room.player1,
		'player2':room.player2,
	}
	if (request.user.username == room.player1 or request.user.username == room.player2):
		return render (request, 'chess/play.html', context)
	else:
		return redirect(f'../../')

@login_required
def result(request, result):
	temp = result.split("__vs__")
	try:
		try:
			room = Match.objects.get(roomname__contains=result)
		except:
			room = Match.objects.get(roomname__contains=f'{temp[0]}__vs__{temp[1]}')
	except:
		pass


	if (request.user.username != temp[1] and request.user.username != temp[0]):
		return redirect ('../../')

	if(request.user.username == temp[0]):
		try:
			room.delete()
		except:
			pass
		return render (request, 'chess/winner.html', {})
	else:
		return render (request, 'chess/loser.html', {})


def draw(request, result):
	temp = result.split("__vs__")
	try:
		try:
			room = Match.objects.get(roomname__contains=result)
		except:
			room = Match.objects.get(roomname__contains=f'{temp[0]}__vs__{temp[1]}')
	except:
		pass


	if (request.user.username != temp[1] and request.user.username != temp[0]):
		return redirect ('../../')

	if(request.user.username == temp[0]):
		try:
			room.delete()
		except:
			pass
		return render (request, 'chess/draw.html', {})
	else:
		return render (request, 'chess/draw.html', {})
