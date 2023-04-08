from django.urls import path
from .views import *
#from chat import urls
from django.conf import settings
from django.conf.urls.static import static

app_name = 'chat'
urlpatterns = [
    path('', rooms, kwargs={'type_room':"Private"},  name='private_rooms'),
    path('public', rooms, kwargs={'type_room':"Public"},  name='public_rooms'),
    path('group', rooms, kwargs={'type_room':"Group"},  name='group_rooms'),
    path('private/<slug:slug>', room, kwargs={'type_room':"Private"}, name='room'),
    path('public/<slug:slug>', room, kwargs={'type_room':"Public"}, name='room'),
    path('group/<slug:slug>', room, kwargs={'type_room':"Group"}, name='room'),
    path('update/<slug:slug>', update_room,  name='update_room'),
    path('delete/<slug:slug>', delete_room,  name='delete_room'),



    path('postal', postal,  name='postal'),
] 

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )

