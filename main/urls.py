from django.urls import path
from .views import * 


urlpatterns = [
    path('', index, name='home'),
    path('portifolio', portifolio, name='portifolio'),
    path('projetos/', projetos, name='projetos'),
    path('projetos/<str:type_project>', projetos_view, name='projetos_view'),
    path('apresentacoes/', apresentacoes, name='apresentacoes'),
    path('apresentacoes/<str:type_presentation>', apresentacoes_view, name='apresentacoes_view'),
    path('documentacoes/', documentacoes, name='documentacoes'),
    path('doc/<str:type_documentation>', docs, name='docs'),
    path('sobre', sobre, name='sobre'),
    path('contato', contato, name='contato'),
    path('teste_sprite', teste_sprite, name='teste_sprite')
]
