from dataclasses import field
import imp

from rest_framework import serializers
from rest_framework.serializers import  FileField
from UserApp.models import Usuario, Sede, Turno, Caja, Servicio, Estado, Persona, Publicidad, ProgramaPublicidad, VwTurno


class UsuarioSerializer(serializers.ModelSerializer):
    sede_nombre = serializers.SlugRelatedField(
        source='sede_codigo', allow_null=True,
        queryset=Sede.objects.all(), required=False,
        slug_field='sede_nombre')

    class Meta:
        model = Usuario
        fields = ['username','first_name','last_name','email',
            'is_superuser','is_staff','sede_nombre','password']

    def validate(self,data):
        return data

    def create(self, validated_data):
        usuario = Usuario(**validated_data)
        usuario.set_password(validated_data['password'])
        usuario.save()
        return usuario.__dict__

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username',instance.username)
        instance.first_name = validated_data.get('first_name',instance.first_name)
        instance.last_name = validated_data.get('last_name',instance.last_name)
        instance.email = validated_data.get('email',instance.email)
        instance.is_superuser = validated_data.get('is_superuser',instance.is_superuser)
        instance.is_staff = validated_data.get('is_staff',instance.is_staff)
        instance.sede_codigo = validated_data.get('sede_nombre',instance.sede_codigo)
        if validated_data['password'] != '1d92a292f49bb163690439bdab37d979e1bc244d':
            instance.set_password(validated_data['password'])
        instance.save()
        return instance.__dict__

    def to_representation(self, instance):
        if isinstance(instance, dict):
            if 'sede_codigo_id' in instance:
                return {'status': 'ok'}
            return {
                'username': instance['username'],
                'first_name': instance['first_name'],
                'last_name': instance['last_name'],
                'email': instance['email'],
                'is_superuser': instance['is_superuser'],
                'is_staff': instance['is_staff'],
                'sede_nombre': instance['sede_codigo__sede_nombre']
            }
        if instance.sede_codigo == None:
            sede = None
        else:
            sede = instance.sede_codigo.sede_nombre
        return {
            'username': instance.username,
            'first_name': instance.first_name,
            'last_name': instance.last_name,
            'email': instance.email,
            'is_superuser': instance.is_superuser,
            'is_staff': instance.is_staff,
            'sede_nombre': sede
        }


class PostTurnoSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Turno
        fields = ('servicio_codigo', 'persona_codigo')

class PostTurnoUpdateSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Turno
        fields = ('turno_codigo','turno_codigo')

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
        fields = ('caja_codigo','caja_nombre','servicio_codigo','sede_codigo','username')

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

class PostPersonaSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Persona
        fields = ('persona_codigo','persona_nombre','persona_documento')

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'
		
    def create(self, validated_data):
		
        persona = Persona(**validated_data)
        persona.save()
       
        return persona.__dict__


class PostPublicidadSerializer(serializers.ModelSerializer):
    file_uploaded = FileField()
    class Meta:
        model = Publicidad
        fields = ['file_uploaded']

class PublicidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicidad
        fields = '__all__'

    def create(self, validated_data):
		
        publicidad = Publicidad(**validated_data)
        publicidad.save()
       
        return publicidad.__dict__

class PostProgramaPublicidadSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = ProgramaPublicidad
        fields = ('ppublicidad_codigo','publicidad_codigo','ppublicidad_tiempo','ppublicidad_orden')

class ProgramaPublicidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramaPublicidad
        fields = '__all__'
		
    def create(self, validated_data):
		
        programaPublicidad = ProgramaPublicidad(**validated_data)
        programaPublicidad.save()
       
        return programaPublicidad.__dict__

class VwTurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VwTurno
        fields = '__all__'

