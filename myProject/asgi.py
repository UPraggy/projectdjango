"""
ASGI config for myProject project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""
"""
import os
import django
from channels.routing import get_default_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myProject.settings")
django.setup()
application = get_default_application()
"""


import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from django.urls import path

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myProject.settings")
# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.
django.setup()
django_asgi_app = get_asgi_application()

#import chat.routing
from chat import consumers as chatcon
from chess import consumers as chesscon

application = ProtocolTypeRouter({
    # Django's ASGI application to handle traditional HTTP requests
    "http": django_asgi_app,

    # WebSocket chat handler
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter([
		   #"chat/"
               	    path("ws/chat/<str:room_name>/", chatcon.ChatConsumer.as_asgi()),
               	    path("ws/chess/play/<str:room_name>/", chesscon.ChessConsumer.as_asgi()),
               	    path("ws/chess/waiting/<str:room_name>/", chesscon.WaitingConsumer.as_asgi()),
		    #chat.routing.websocket_urlpatterns,
            ])
        )
    ),
})

"""
import os
from django.core.asgi import get_asgi_application

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTyperRouter, URLRouter

from .chat import routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myProject.settings")
# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.

application = get_asgi_application()
application = ProtocolTyperRouter({
	"http": get_asgi_application(),
	"websocket": AuthMiddlewareStack(
		URLRouter(
			chat.routing.websocket_urlpatterns
			)
		)
	})

"""
