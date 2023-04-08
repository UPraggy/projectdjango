from django.urls import path
from .views import *

app_name = 'chess'
urlpatterns = [
    #path('chess/', chess,  name='play'),
    #path('play/', play,  name='play'),
    path('play/<slug:slug>', play,  name='play'),
    path('', red_wait,  name='red_wait'),
    path('waiting/', search,  name='search_room'),
    path('waiting/<slug:slug>', wait,  name='waiting'),
    path('result/<str:result>', result,  name='result'),
    path('result/draw/<str:result>', draw,  name='result'),
]

