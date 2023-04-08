import json 


from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async

from django.contrib.auth.models import User

from .models import Message, Room

class ChatConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		print("CONNECTED TO CHAT")
		self.room_name = self.scope['url_route']['kwargs']['room_name'] # url route {'args': (), 'kwargs': {'room_name': 'Yoru Room Name'}}
		self.room_group_name = 'chat_%s' % self.room_name #chat_my_room

		await self.channel_layer.group_add(
			self.room_group_name, # group
			self.channel_name # channel
			)
		
		await self.accept()
		

	async def disconnect(self, close_code):
		await self.channel_layer.group_discard(
			self.room_group_name, # group
			self.channel_name # channel			
			)

	async def receive(self, text_data):
		data = json.loads(text_data) # load json package {"message":"","username":"","room":""}
		message = data['message']
		username = data['username']
		room = data['room']
		print("RECEIVE")

		await self.save_message(username, room, message)

		await self.channel_layer.group_send(
			self.room_group_name,
			{
			'type' : 'chat_message',
			'message' : message,
			'username' : username,
			'room' : room,
			}
			)

	async def chat_message(self, event):
		message = event['message']
		username = event['username']
		room = event['room']
		print("CHAT MESSAGE")
		await self.send(text_data=json.dumps({ # create json package {"message":"","username":"","room":""}
			'message' : message,
			'username' : username,
			'room' : room,
			}))

	@sync_to_async
	def save_message(self, username, room, message):
		user = User.objects.get(username=username)
		room = Room.objects.get(slug=room)
		
		Message.objects.create(user=user, room=room, content=message)
