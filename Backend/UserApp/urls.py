from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from UserApp.views import UsuarioApi, Aleatorio, TurnoController, SedeController, ServicioController, CajaController, EstadoController, PersonaController, PublicidadController

urlpatterns = [
    path('usuarios', UsuarioApi.as_view()),
    path('usuarios/<username>/', UsuarioApi.as_view()),
    path('aleatorio/<int:limite>/',Aleatorio.as_view()),
    
    path('turno',TurnoController.as_view({'post': 'postTurno'  })),
    path('turno/<int:idcaja>/',TurnoController.as_view({'get': 'getTurno'})),

    path('sede',SedeController.as_view({'post': 'postSede' ,'get': 'getSede'})),
    path('sede/<int:idsede>/',SedeController.as_view({'get': 'getSede'})),
    
    path('servicio',ServicioController.as_view({'post': 'postServicio' ,'get': 'getServicio'})),
    path('servicio/<int:idservicio>/',ServicioController.as_view({'get': 'getServicio'})),
    
    path('caja',CajaController.as_view({'post': 'postCaja' ,'get': 'getCaja'})),
    path('caja/<int:idcaja>/',CajaController.as_view({'get': 'getCaja'})),

    path('estado',EstadoController.as_view({'post': 'postEstado' ,'get': 'getEstado'})),
    path('estado/<int:idestado>/',EstadoController.as_view({'get': 'getEstado'})),

    path('persona',PersonaController.as_view({'post': 'postPersona' ,'get': 'getPersona'})),
    path('persona/<int:idpersona>/',PersonaController.as_view({'get': 'getPersona'})),
    path('persona/<str:docpersona>/',PersonaController.as_view({'get': 'getPersona'})),

    path('publicidad',PublicidadController.as_view({'post': 'postPublicidad','get': 'getPublicidad'})),


]

urlpatterns = format_suffix_patterns(urlpatterns)
