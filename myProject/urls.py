"""myProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
#from chat import urls


urlpatterns = [
    path('', include('main.urls')),
    path('accounts/', include('user_auth.urls')), #google authentication
    path('', include('django.contrib.auth.urls')),#"local" authentication
    path('chat/', include('chat.urls', namespace='chat')), # chat application
    path('automail/', include('automail.urls', namespace='email')), # email application
    path('chess/', include('chess.urls', namespace='chess')), # chess application
    path('admin/', admin.site.urls),
]
