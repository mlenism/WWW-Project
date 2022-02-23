from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from UserApp.views import UsuarioApi, Aleatorio, TurnoTicket

urlpatterns = [
    path('usuarios', UsuarioApi.as_view()),
    path('usuarios/<int:pk>/', UsuarioApi.as_view()),
    path('aleatorio/<int:limite>/',Aleatorio.as_view()),
    path('turno/<int:idcaja>/',TurnoTicket.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
