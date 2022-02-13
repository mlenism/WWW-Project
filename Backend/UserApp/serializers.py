import imp
from rest_framework import serializers
from UserApp.models import Usuario
from UserApp.models import Rol
from UserApp.models import Sede

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['rol_nombre']

class SedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = ['sede_nombre']

class UsuarioSerializer(serializers.ModelSerializer):
    rol_codigo = RolSerializer()
    sede_codigo = SedeSerializer()
    class Meta:
        model = Usuario
        fields = ['usuario_login', 'usuario_clave', 'rol_codigo', 'sede_codigo']
        extra_kwargs = {'usuario_clave': {'write_only': True}}