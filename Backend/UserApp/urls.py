from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from UserApp.views import UsuarioApi

urlpatterns = [
    path('usuarios', UsuarioApi.as_view()),
    path('usuarios/<int:pk>/', UsuarioApi.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)