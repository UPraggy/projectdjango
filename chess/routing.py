from django.urls import  path
from chess import consumers


websocket_urlpatterns = [
	path('ws/chess/play/<str:room_name>/', consumers.ChessConsumer.as_asgi())
	path('ws/chess/waiting/<str:room_name>/', consumers.WaitingConsumer.as_asgi())
]


	
