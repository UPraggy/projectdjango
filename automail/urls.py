from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

app_name = 'automail'
urlpatterns = [
    path('', index,  name='email_view'),
    path('view_email/<int:id>', view_email,  name='base_temp'),
    path('view_email/', view_email, kwargs={"id":"default"}, name='base_temp'),
    path('delete/<int:id>', delete_email,  name='delete_email'),
]


