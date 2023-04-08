from django.contrib.auth import views as auth_views
from django.urls import path, include
from .views import *



urlpatterns = [
path('', include('allauth.urls')), #google authentication
path('password_reset/', auth_views.PasswordResetView.as_view(html_email_template_name='registration/password_reset_email.html'),name='password_reset'),
path('register/', register, name='register'), #"local" authentication
path('change_record/', register_change, name='change-record'), #"local" authentication
]