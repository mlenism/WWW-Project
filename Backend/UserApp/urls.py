from django.urls import path
from UserApp.views import UsuarioApi

urlpatterns = [
    path('usuarios', UsuarioApi)
]