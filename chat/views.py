from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from .models import Message, Room
from .forms import RoomForm
from django.db import IntegrityError
from django.contrib import messages
import re 
# Create your views here.


@login_required
def rooms(request, type_room):
	form = RoomForm()
	tmp = 'This name has already been used!'
	if request.method == 'POST':
		try:
			form = RoomForm(request.POST, request.FILES)
			if form.is_valid():
				post = form.save(commit=False)
				temp = form.cleaned_data["name"]
				temp = re.sub(u'[!@#$%¨&*(:)+=-?\'\"]', '', temp)
				temp = temp.lower().strip().split(" ")
				temp = '_'.join(temp)
				post.slug = f'{request.user.id}_{temp}'
				if (form.cleaned_data["name_authorized"] != "None"):
					temp = [form.cleaned_data["authorized_users"],form.cleaned_data["name_authorized"]]
					post.authorized_users = f'{temp[0]}{temp[1]},'
				post.save()
		except IntegrityError as e: 
			messages.warning(request, 'This name has already been used!')
	if (type_room == "Private"):
		rooms = Room.objects.filter(room_type__contains=type_room, authorized_users__contains=f'{request.user.username},')
	elif (type_room == "Group"):
		rooms = Room.objects.filter(room_type__contains=type_room, authorized_users__contains=f'{request.user.username},')
	else:
		rooms = Room.objects.filter(room_type__contains=type_room)
	return render(request, 'chat/rooms.html', {'rooms':rooms, 'form' : form, 'tmp': tmp, 'type_room':type_room})




@login_required
def room(request, slug, type_room):

	room = Room.objects.get(slug=slug)
	msg = Message.objects.filter(room=room)[0:25]
	temp2 = ''
	for x in range(0, len(msg)):
		if msg[x].user.username == temp2:
			temp2 = msg[x].user.username
			msg[x].user.username = f'not {msg[x].user.username}'
		else:
			temp2 = msg[x].user.username


	
	if (type_room == "Private"):
		rooms = Room.objects.filter(room_type__contains=type_room, authorized_users__contains=f'{request.user.username},')
	elif (type_room == "Group"):
		rooms = Room.objects.filter(room_type__contains=type_room, authorized_users__contains=f'{request.user.username},')
	else:
		rooms = Room.objects.filter(room_type__contains=type_room)
	return render(request, 'chat/room.html', {'room': room, 'msg':msg,'rooms':rooms})

@login_required
def update_room(request, slug):
	room = get_object_or_404(Room, slug=slug)
	form = RoomForm(instance=room)
	auth_user = room.authorized_users.split(',')
	auth_user = ','.join(auth_user[1:])
	tmp = 'This name has already been used!'
	if(request.method == 'POST'):
		try:
			
			form = RoomForm(request.POST, request.FILES, instance=room)
			if(form.is_valid()):
				room = form.save(commit=False)
				temp = form.cleaned_data["name"]
				temp = re.sub(u'[!@#$%¨&*(:)+=-?\'\"]', '', temp)
				temp = temp.lower().strip().split(" ")
				temp = '_'.join(temp)
				room.slug = f'{request.user.id}_{temp}'
				form.cleaned_data["name_authorized"] = form.cleaned_data["name_authorized"].replace(",,",",")
				if (form.cleaned_data["name_authorized"] != "None"):
						temp = [f'{request.user.username},',form.cleaned_data["name_authorized"]]
						room.authorized_users = f'{temp[0]}{temp[1]},'
				room.save()
				return redirect('../../')
		except IntegrityError as e: 
			messages.warning(request, 'This name has already been used!')
            
	return render(request, 'chat/room_update.html', {'form': form, 'room' : room, "auth_user":auth_user})


@login_required
def delete_room(request, slug):
	Room.objects.get(slug=slug).delete()
	return redirect("../")





def postal(request):
	return render(request, 'chat/cartao_postal.html')