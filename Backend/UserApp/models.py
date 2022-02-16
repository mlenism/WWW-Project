from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin

class Sede(models.Model):
    sede_codigo = models.BigAutoField(primary_key=True)
    sede_nombre = models.CharField(max_length=50)

    def __str__(self):
        str = ("SEDE\n"
        f"sede_codigo: {self.sede_codigo},\n"
        f"sede_nombre: {self.sede_nombre}")
        return str


class Caja(models.Model):
    caja_codigo = models.OneToOneField('Servicio', models.DO_NOTHING, primary_key=True)
    caja_nombre = models.CharField(unique=True, max_length=50)
    servicio_codigo = models.BigIntegerField()
    sede_codigo = models.ForeignKey(Sede, models.DO_NOTHING, blank=True, null=True)


class Estado(models.Model):
    estado_codigo = models.BigAutoField(primary_key=True)
    estado_nombre = models.CharField(max_length=50)


class Persona(models.Model):
    persona_codigo = models.BigIntegerField(primary_key=True)
    persona_nombre = models.CharField(max_length=50)
    persona_documento = models.CharField(max_length=20)


class Publicidad(models.Model):
    publicidad_codigo = models.BigAutoField(primary_key=True)
    publicidad_tipo = models.CharField(max_length=50)
    publicidad_ruta = models.TextField()


class ProgramaPublicidad(models.Model):
    ppublicidad_codigo = models.BigAutoField(primary_key=True)
    publicidad_codigo = models.ForeignKey(Publicidad, models.DO_NOTHING)
    ppublicidad_tiempo = models.BigIntegerField()
    ppublicidad_orden = models.BigIntegerField()


class Servicio(models.Model):
    servicio_codigo = models.BigAutoField(primary_key=True)
    servicio_nombre = models.CharField(unique=True, max_length=50)
    servicio_prefijo = models.CharField(unique=True, max_length=2)
    servicio_prioridad = models.BigIntegerField()
    servicio_consecutivoactual = models.BigIntegerField()


class Turno(models.Model):
    turno_codigo = models.BigAutoField(primary_key=True)
    turno_fecha = models.DateField()
    truno_hora = models.TimeField()
    turno_fechaejecucion = models.DateField(blank=True, null=True)
    turno_horaejecucion = models.TimeField(blank=True, null=True)
    servicio_codigo = models.ForeignKey(Servicio, models.DO_NOTHING)
    caja_codigo = models.ForeignKey(Caja, models.DO_NOTHING, blank=True, null=True)
    turno_consecutivo = models.BigIntegerField()
    estado_codigo = models.ForeignKey(Estado, models.DO_NOTHING)
    persona_codigo = models.ForeignKey(Persona, models.DO_NOTHING)


class Usuario(AbstractUser):
    username = models.CharField(max_length = 150, unique = True)
    email = models.EmailField(max_length = 150, unique = True, )
    first_name = models.CharField(max_length = 150)
    last_name = models.CharField(max_length = 150)
    is_active = models.BooleanField(default = True)
    is_staff = models.BooleanField(default = False)
    sede_codigo = models.ForeignKey(Sede, models.DO_NOTHING, null=True)

    REQUIRED_FIELDS = ['email','first_name','last_name']

    def __str__(self):
        str = ("USUARIO\n"
        f"username: {self.username}"
        f"email: {self.email}"
        f"first_name: {self.first_name}"
        f"last_name: {self.last_name}"
        f"is_active: {self.is_active}"
        f"is_staff: {self.is_staff}"
        f"sede_codigo: {self.sede_codigo}")
        return str
