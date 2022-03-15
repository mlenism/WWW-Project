from enum import unique
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin




class Sede(models.Model):
    sede_codigo = models.BigAutoField(primary_key=True)
    sede_nombre = models.CharField(max_length=50, unique=True)

    def __str__(self):
        str = ("SEDE\n"
        f"sede_codigo: {self.sede_codigo},\n"
        f"sede_nombre: {self.sede_nombre}")
        return str


class Estado(models.Model):
    estado_codigo = models.BigAutoField(primary_key=True)
    estado_nombre = models.CharField(max_length=50, unique=True)

    def __str__(self):
        str = ("ESTADO\n"
        f"estado_codigo: {self.estado_codigo},\n"
        f"estado_nombre: {self.estado_nombre}")
        return str


class Persona(models.Model):
    persona_codigo = models.BigAutoField(primary_key=True)
    persona_nombre = models.CharField(max_length=50)
    persona_documento = models.CharField(max_length=20, unique=True)

    def __str__(self):
        str = ("PERSONA\n"
        f"persona_codigo: {self.persona_codigo},\n"
        f"persona_nombre: {self.persona_nombre},\n"
        f"persona_documento: {self.persona_documento}")
        return str


class Publicidad(models.Model):

    TYPE_CHOICES = (
        ("IMAGEN", "IMAGEN"),
        ("VIDEO", "VIDEO"),
        ("AUDIO", "AUDIO"),
    )
    publicidad_codigo = models.BigAutoField(primary_key=True)
    publicidad_tipo = models.CharField(max_length=50, choices=TYPE_CHOICES)
    publicidad_ruta = models.TextField()
    

    def __str__(self):
        str = ("PUBLICIDAD\n"
        f"publicidad_codigo: {self.publicidad_codigo},\n"
        f"publicidad_tipo: {self.publicidad_tipo},\n"
        f"publicidad_ruta: {self.publicidad_ruta}")
        return str


class ProgramaPublicidad(models.Model):
    ppublicidad_codigo = models.BigAutoField(primary_key=True)
    publicidad_codigo = models.ForeignKey(Publicidad, models.DO_NOTHING)
    ppublicidad_tiempo = models.BigIntegerField()
    ppublicidad_orden = models.BigIntegerField()

    def __str__(self):
        str = ("PROGRAMA PUBLICIDAD\n"
        f"ppublicidad_codigo: {self.ppublicidad_codigo},\n"
        f"publicidad_codigo: {self.publicidad_codigo},\n"
        f"publicidad_tiempo: {self.ppublicidad_tiempo},\n"
        f"ppublicidad_orden: {self.ppublicidad_orden}")
        return str


class Servicio(models.Model):
    servicio_codigo = models.BigAutoField(primary_key=True)
    servicio_nombre = models.CharField(unique=True, max_length=50)
    servicio_prefijo = models.CharField(unique=True, max_length=2)
    servicio_prioridad = models.FloatField(blank=True, null=True, default='0')
    servicio_consecutivoactual = models.BigIntegerField(default='0')

    def __str__(self):
        str = ("SERVICIO\n"
        f"servicio_codigo: {self.servicio_codigo},\n"
        f"servicio_nombre: {self.servicio_nombre},\n"
        f"servicio_prefijo: {self.servicio_prefijo},\n"
        f"servicio_prioridad: {self.servicio_prioridad},\n"
        f"servicio_cosecutivoactual: {self.servicio_consecutivoactual}")
        return str


class Caja(models.Model):
    caja_codigo = models.BigAutoField(primary_key=True)
    caja_nombre = models.CharField(unique=True, max_length=50)
    servicio_codigo = models.ForeignKey(Servicio, models.DO_NOTHING, null=True)
    sede_codigo = models.ForeignKey(Sede, models.DO_NOTHING, null=True)

    REQUIRED_FIELDS = ['caja_codigo','caja_nombre','servicio_codigo','sede_codigo']

    def __str__(self):
        str = ("CAJA\n"
        f"caja_codigo: {self.caja_codigo},\n"
        f"caja_nombre: {self.caja_nombre},\n"
        f"servicio_codigo: {self.servicio_codigo},\n"
        f"sede_codigo: {self.sede_codigo}")
        return str


class Turno(models.Model):
	turno_codigo = models.BigAutoField(primary_key=True)
	turno_fecha = models.DateField(auto_now_add=True, blank=True)
	turno_hora = models.TimeField(auto_now_add=True, blank=True)
	turno_fechaejecucion = models.DateField(blank=True, null=True)
	turno_horaejecucion = models.TimeField(blank=True, null=True)
	servicio_codigo = models.ForeignKey(Servicio, models.DO_NOTHING)
	caja_codigo = models.ForeignKey(Caja, models.DO_NOTHING, blank=True, null=True)
	turno_consecutivo = models.BigIntegerField()
	estado_codigo = models.ForeignKey(Estado, models.DO_NOTHING)
	persona_codigo = models.ForeignKey(Persona, models.DO_NOTHING)

	REQUIRED_FIELDS = ['servicio_codigo','turno_consecutivo','persona_codigo','estado_codigo']

	def __str__(self):
		str = ("TURNO\n"
		f"turno_codigo: {self.turno_codigo},\n"
		f"turno_fecha: {self.turno_fecha},\n"
		f"turno_hora: {self.turno_hora},\n"
		f"turno_fechaejecucion: {self.turno_fechaejecucion},\n"
		f"turno_horaejecucion: {self.turno_horaejecucion},\n"
		f"servicio_codigo: {self.servicio_codigo},\n"
		f"caja_codigo: {self.caja_codigo},\n"
		f"turno_consecutivo: {self.turno_consecutivo},\n"
		f"estado_codigo: {self.estado_codigo},\n"
		f"persona_codigo: {self.persona_codigo}")
		return str


class Usuario(AbstractUser):
    username = models.CharField(max_length = 150, unique = True)
    email = models.EmailField(max_length = 150, unique = True)
    first_name = models.CharField(max_length = 150)
    last_name = models.CharField(max_length = 150)
    sede_codigo = models.ForeignKey(Sede, models.DO_NOTHING, null=True)

    REQUIRED_FIELDS = ['email','first_name','last_name']

    def __str__(self):
        str = ("USUARIO\n"
        f"username: {self.username}\n"
        f"email: {self.email}\n"
        f"first_name: {self.first_name}\n"
        f"last_name: {self.last_name}\n"
        f"is_active: {self.is_active}\n"
        f"is_staff: {self.is_staff}\n"
        f"is_active: {self.is_active}\n"
        f"sede_codigo: {self.sede_codigo}")
        return str


    