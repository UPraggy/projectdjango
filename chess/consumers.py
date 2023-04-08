import json 


from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async

from django.contrib.auth.models import User



class ChessConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		print("CONNECTED TO CHESS GAME")
		self.room_name = self.scope['url_route']['kwargs']['room_name'] # url route {'args': (), 'kwargs': {'room_name': 'Your Room Name'}}
		self.room_group_name = 'chat_%s' % self.room_name #chat_my_room_chess

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
		data = json.loads(text_data) # load json package {"parameters":""}
		parameters = data['parameters']
		print("RECEIVE")

		await self.channel_layer.group_send(
			self.room_group_name,
			{
			'type' : 'chat_message',
			'parameters' : parameters,
			}
			)

	async def chat_message(self, event):
		parameters = event['parameters']
		print("MESSAGE")
		await self.send(text_data=json.dumps({ # create json package {"message":"","username":"","room":""}
			'parameters' : parameters,
			}))

from .models import Match
class WaitingConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		print("CONNECTED TO CHESS GAME")
		self.room_name = self.scope['url_route']['kwargs']['room_name'] # url route {'args': (), 'kwargs': {'room_name': 'Your Room Name'}}
		self.room_group_name = 'chat_%s' % self.room_name #chat_my_room_chess

		await self.channel_layer.group_add(
			self.room_group_name, # group
			self.channel_name # channel
			)
		
		await self.accept()

		await self.receive(json.dumps({'parameters':self.room_name}))
		

	async def disconnect(self, close_code):
		await self.channel_layer.group_discard(
			self.room_group_name, # group
			self.channel_name # channel			
			)

	async def receive(self, text_data):
		data = json.loads(text_data) # load json package {"parameters":""}
		
		parameters = data['parameters']
		await self.channel_layer.group_send(
			self.room_group_name,
			{
			'type' : 'chat_message',
			'parameters' : parameters,
			}
			)

	async def chat_message(self, event):
		parameters = event['parameters']
		print("MESSAGE")
		await self.send(text_data=json.dumps({ # create json package {"nothing":""}
			'parameters' : parameters,
			}))
