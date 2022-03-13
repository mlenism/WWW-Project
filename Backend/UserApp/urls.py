from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from UserApp.views import UsuarioApi, Aleatorio, TurnoController, SedeController

urlpatterns = [
    path('usuarios', UsuarioApi.as_view()),
    path('usuarios/<username>/', UsuarioApi.as_view()),
    path('aleatorio/<int:limite>/',Aleatorio.as_view()),
    
    path('turno',TurnoController.as_view({'post': 'postTurno'  })),
    path('turno/<int:idcaja>/',TurnoController.as_view({'get': 'getTurno'})),

    path('sede',SedeController.as_view({'post': 'postSede' ,'get': 'getSede'})),
    path('sede/<int:idsede>/',SedeController.as_view({'get': 'getSede'})),
    
    
]

urlpatterns = format_suffix_patterns(urlpatterns)
