import imp
from rest_framework import serializers
from UserApp.models import Usuario, Sede

class UsuarioSerializer(serializers.ModelSerializer):
    sede_nombre = serializers.SlugRelatedField(source='sede_codigo', allow_null=True, queryset=Sede.objects.all(), required=False, slug_field='sede_nombre')

    class Meta:
        model = Usuario
        fields = '__all__'

    def create(self, validated_data):
        usuario = Usuario(**validated_data)
        usuario.set_password(validated_data['password'])
        usuario.save()
        return usuario.__dict__

    def update(self, instance, validated_data):
        usuario: Usuario = super().update(instance, validated_data)
        usuario.set_password(validated_data['password'])
        usuario.save()
        return usuario.__dict__

    def to_representation(self, instance):
        if 'sede_codigo__sede_nombre' in instance:
            sede_nombre = instance['sede_codigo__sede_nombre']
        else:
            sede_nombre = instance['sede_codigo_id']
        return {
            'username': instance['username'],
            'first_name': instance['first_name'],
            'last_name': instance['last_name'],
            'email': instance['email'],
            'is_superuser': instance['is_superuser'],
            'is_staff': instance['is_staff'],
            'is_active': instance['is_active'],
            'date_joined': instance['date_joined'],
            'sede_nombre': sede_nombre,
            'password': instance['password'],
        }