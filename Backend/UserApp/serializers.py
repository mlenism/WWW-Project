import imp
from rest_framework import serializers
from UserApp.models import Usuario, Sede, Turno, Caja, Servicio, Estado


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


class PostTurnoSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Turno
        fields = ('servicio_codigo', 'persona_codigo')

class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno
        fields = '__all__'
		
    def create(self, validated_data):
		
        turno = Turno(**validated_data)
        turno.save()
       
        return turno.__dict__

class PostSedeSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Sede
        fields = ('sede_codigo','sede_nombre')

class SedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = '__all__'
		
    def create(self, validated_data):
		
        sede = Sede(**validated_data)
        sede.save()
       
        return sede.__dict__

class PostServicioSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Servicio
        fields = ('servicio_codigo','servicio_nombre', 'servicio_prefijo', 'servicio_prioridad')

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'
		
    def create(self, validated_data):
		
        servicio = Servicio(**validated_data)
        servicio.save()
       
        return servicio.__dict__

class PostCajaSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Caja
        fields = ('caja_codigo','caja_nombre','servicio_codigo','sede_codigo')

class CajaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Caja
        fields = '__all__'
		
    def create(self, validated_data):
		
        caja = Caja(**validated_data)
        caja.save()
       
        return caja.__dict__

class PostEstadoSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Estado
        fields = ('estado_codigo','estado_nombre')

class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = '__all__'
		
    def create(self, validated_data):
		
        estado = Estado(**validated_data)
        estado.save()
       
        return estado.__dict__
