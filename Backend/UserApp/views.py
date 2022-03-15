from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.http import Http404, HttpResponse
from django.db import connection
from django.conf import settings as django_settings
from UserApp.models import Usuario, Turno, Servicio, Persona, Estado, Caja, Sede, Publicidad
from UserApp.serializers import UsuarioSerializer, PostTurnoSerializer, TurnoSerializer, PostSedeSerializer, SedeSerializer, PostServicioSerializer, ServicioSerializer, PostCajaSerializer, CajaSerializer
from UserApp.serializers import PostEstadoSerializer, EstadoSerializer, PostPersonaSerializer, PersonaSerializer, PostPublicidadSerializer, PublicidadSerializer
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

from gtts import gTTS

import random, datetime, pytz,json
import os

class UsuarioApi(APIView):

    values = ['username', 'first_name', 'last_name', 'email',
        'is_superuser', 'is_staff', 'is_active',
        'date_joined', 'password', 'sede_codigo__sede_nombre']

    def get_object(self, username):
        try:
            return Usuario.objects.get(username=username)
        except Usuario.DoesNotExist:
            raise Http404

    def get(self, request, username=None, format=None):
        if username == None:
            usuarios = Usuario.objects.all().values(*self.values)
            serializer = UsuarioSerializer(usuarios, many=True)
        else:
            try:
                usuarios = Usuario.objects.values(*self.values).get(username=username)
            except Usuario.DoesNotExist:
                raise Http404
            serializer = UsuarioSerializer(usuarios)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, username, format=None):
        usuario = self.get_object(username)
        serializer = UsuarioSerializer(usuario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        usuario = self.get_object(pk)
        usuario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class Aleatorio(APIView):
	
	def get(self, request, limite, format=None):
		
		colombia = pytz.timezone('America/Bogota')
		#Define la fecha actual del sistema
		dt =datetime.datetime.now()
		fecha_creacion = colombia.localize(dt).strftime("%Y-%m-%d");
		
		#Calcula valores por defecto que se requieren para realizar los insert a la base de datos, estado y persona
		obj_estado   = Estado.objects.get(estado_codigo=1)
		obj_persona  = Persona.objects.get(persona_codigo=1)
			
		i=0
		while i < limite:
			# Para que las horas sean distitas unas de otras se incrementa 20 segundos en cada iteraccion
			tiempo_adicional = datetime.timedelta(hours=0,minutes=0,seconds=20*(limite-i))
			hora_creacion = (colombia.localize(datetime.datetime.now()) -tiempo_adicional).strftime("%H:%M:%S");
			
			#Se calcula un servicio de manera aleatoria y se actualiza el consecutivo, 
			id_servicio = random.randint(1,5)
			obj_servicio = Servicio.objects.get(servicio_codigo=id_servicio)
			obj_servicio.servicio_consecutivoactual=obj_servicio.servicio_consecutivoactual+1;
			obj_servicio.save()
			
			#respuesta="Ok  Limite %i  Random %s Servicio %i Fecha %s Hora %s " %(limite,id_servicio,obj_servicio.servicio_codigo,fecha_creacion,hora_creacion) 
			#Se inserta el registros en BD
			turno = Turno(turno_fecha=fecha_creacion,
				turno_hora=hora_creacion,
				servicio_codigo=obj_servicio,
				turno_consecutivo=obj_servicio.servicio_consecutivoactual,
				estado_codigo=obj_estado,
				persona_codigo=obj_persona)
			turno.save()
			i=i+1
		respuesta="Turnos Aleatorios Creados"
		return HttpResponse(respuesta )

class TurnoController(viewsets.ModelViewSet):
	queryset = Turno.objects.all()
	serializer_class = PostTurnoSerializer

	
	@action(detail=True, methods=['post'])
	def postTurno(self, request):
		dataTurno={}
		dataTurno['estado_codigo']=1		
		dataTurno['servicio_codigo']=request.data['servicio_codigo']
		dataTurno['persona_codigo']=request.data['persona_codigo']
		

		try:
			obj_servicio = Servicio.objects.get(servicio_codigo=request.data['servicio_codigo'])
			obj_servicio.servicio_consecutivoactual=obj_servicio.servicio_consecutivoactual+1
			obj_servicio.save()
			
			dataTurno['turno_consecutivo'] = obj_servicio.servicio_consecutivoactual
			respuesta = 'Consecutivo creado '+obj_servicio.servicio_prefijo+'-'+str(obj_servicio.servicio_consecutivoactual)
		except Servicio.DoesNotExist:
			return Response('Servicio enviado no existe',status=status.HTTP_400_BAD_REQUEST)


		serializer=TurnoSerializer(data=dataTurno)
		
		if serializer.is_valid():
			serializer.save()
			
			return Response({'status':respuesta})
		else:
			return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

	@action(detail=True, methods=['get'])
	def getTurno(self, request,idcaja=None):
		if idcaja == None:
			return Response(status=status.HTTP_204_NO_CONTENT)
		
		try:
			obj_caja   = Caja.objects.get(caja_codigo=idcaja)
		

			try:
				obj_turno=Turno.objects.get(estado_codigo=4,caja_codigo_id=idcaja)
				consulta="""SELECT *,99 as prioridadfinal FROM vw_turnos T, "UserApp_caja" c 
				WHERE T.servicio_codigo_id=C.servicio_codigo_id AND T.turno_codigo=%s limit 1""" %obj_turno.turno_codigo
			except Turno.DoesNotExist:
			
				consulta="""(SELECT *,99 as prioridadfinal FROM vw_turnos T, "UserApp_caja" c 
				WHERE T.servicio_codigo_id=C.servicio_codigo_id AND C.caja_codigo= %s AND T.estado_codigo=1) UNION ALL   
				(SELECT *,prioridad as prioridadfinal FROM vw_turnos T, "UserApp_caja" c 
				WHERE T.servicio_codigo_id=C.servicio_codigo_id AND C.caja_codigo!=%s  AND T.estado_codigo=1  
				) ORDER BY prioridadfinal desc,turno_fecha asc,turno_hora asc limit 1 """%(idcaja,idcaja)
		
		
			with connection.cursor() as cursor:
				cursor.execute(consulta)
				row=dictfetchall(cursor)
				#row = cursor.fetchall()
		
			turno      =row[0].get('turno_codigo')
			obj_estado = Estado.objects.get(estado_codigo=4)
			obj_turno  = Turno.objects.get(turno_codigo=turno)
			obj_turno.estado_codigo=obj_estado
			obj_turno.caja_codigo_id=idcaja
			obj_turno.save()
			consecutivo = row[0].get('consecutivo')
			tts("Turno "+consecutivo, 'es', django_settings.STATIC_ROOT+'/%s.mp3'%consecutivo) 

			return Response(row )
			
		except Caja.DoesNotExist:
			return Response('Caja enviada no existe',status=status.HTTP_404_NOT_FOUND)

class SedeController(viewsets.ModelViewSet):
	queryset = Sede.objects.all()
	serializer_class = PostSedeSerializer

	
	@action(detail=True, methods=['post'])
	def postSede(self, request):
		

		serializer=SedeSerializer(data=request.data)
		
		if serializer.is_valid():
			serializer.save()
			
			return Response({'status':'Sede Ingresada'})
		else:
			return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

	@action(detail=True, methods=['get'])
	def getSede(self, request,idsede=None):
		if idsede == None:
			queryset = Sede.objects.all()
			serializer = SedeSerializer(queryset, many=True)
			return Response(serializer.data)
		else:	
			queryset = Sede.objects.all()
			sede = get_object_or_404(queryset, pk=idsede)
			serializer = SedeSerializer(sede)
			return Response(serializer.data)

	@action(detail=True, methods=['put'])
	def putSede(self, request):
		
		sede = self.get_object(request.data["sede_codigo"])
		serializer = SedeSerializer(sede, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)		
	
	def get_object(self, sede_codigo):
		try:
			return Sede.objects.get(sede_codigo=sede_codigo)
		except Sede.DoesNotExist:
			raise Http404		

class ServicioController(viewsets.ModelViewSet):
	queryset = Servicio.objects.all()
	serializer_class = PostServicioSerializer

	
	@action(detail=True, methods=['post'])
	def postServicio(self, request):
		
		serializer=ServicioSerializer(data=request.data)
		
		if serializer.is_valid():
			serializer.save()
			
			return Response({'status':'Servicio Registrado'})
		else:
			return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

	@action(detail=True, methods=['get'])
	def getServicio(self, request,idservicio=None):
		if idservicio == None:
			queryset = Servicio.objects.all()
			serializer = ServicioSerializer(queryset, many=True)
			return Response(serializer.data)
		else:	
			queryset = Servicio.objects.all()
			servicio = get_object_or_404(queryset, pk=idservicio)
			serializer = ServicioSerializer(servicio)
			return Response(serializer.data)


	@action(detail=True, methods=['put'])
	def putServicio(self, request):
		
		servicio = self.get_object(request.data["servicio_codigo"])
		serializer = ServicioSerializer(servicio, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)		
	
	@action(detail=True, methods=['post'])
	def postInicializarServicio(self, request):
		
		Servicio.objects.filter(servicio_codigo=request.data["servicio_codigo"]).update(servicio_consecutivoactual='0')
		return Response({'status':'Consecutivos inicializados'})


	def get_object(self, servicio_codigo):
		try:
			return Servicio.objects.get(publicidad_codigo=servicio_codigo)
		except Servicio.DoesNotExist:
			raise Http404		

class CajaController(viewsets.ModelViewSet):
	queryset = Caja.objects.all()
	serializer_class = PostCajaSerializer

	
	@action(detail=True, methods=['post'])
	def postCaja(self, request):
		
		serializer=CajaSerializer(data=request.data)
		
		if serializer.is_valid():
			serializer.save()
			
			return Response({'status':'Caja Registrado'})
		else:
			return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

	@action(detail=True, methods=['get'])
	def getCaja(self, request,idcaja=None):
		if idcaja == None:
			queryset = Caja.objects.all()
			serializer = CajaSerializer(queryset, many=True)
			return Response(serializer.data)
		else:	
			queryset = Caja.objects.all()
			caja = get_object_or_404(queryset, pk=idcaja)
			serializer = CajaSerializer(caja)
			return Response(serializer.data)

	@action(detail=True, methods=['put'])
	def putCaja(self, request):
		
		caja = self.get_object(request.data["caja_codigo"])
		serializer = CajaSerializer(caja, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)		
	
	def get_object(self, caja_codigo):
		try:
			return Caja.objects.get(caja_codigo=caja_codigo)
		except Caja.DoesNotExist:
			raise Http404


class EstadoController(viewsets.ModelViewSet):
	queryset = Estado.objects.all()
	serializer_class = PostEstadoSerializer

	
	@action(detail=True, methods=['post'])
	def postEstado(self, request):
		
		serializer=EstadoSerializer(data=request.data)
		
		if serializer.is_valid():
			serializer.save()
			
			return Response({'status':'Estado Registrado'})
		else:
			return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

	@action(detail=True, methods=['get'])
	def getEstado(self, request,idestado=None):
		if idestado == None:
			queryset = Estado.objects.all()
			serializer = EstadoSerializer(queryset, many=True)
			return Response(serializer.data)
		else:	
			queryset = Estado.objects.all()
			estado = get_object_or_404(queryset, pk=idestado)
			serializer = EstadoSerializer(estado)
			return Response(serializer.data)

	@action(detail=True, methods=['put'])
	def putEstado(self, request):
		
		estado = self.get_object(request.data["estado_codigo"])
		serializer = EstadoSerializer(estado, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)		
	
	def get_object(self, estado_codigo):
		try:
			return Estado.objects.get(estado_codigo=estado_codigo)
		except Estado.DoesNotExist:
			raise Http404		

class PersonaController(viewsets.ModelViewSet):
	queryset = Persona.objects.all()
	serializer_class = PostPersonaSerializer

	
	@action(detail=True, methods=['post'])
	def postPersona(self, request):
		
		serializer=PersonaSerializer(data=request.data)
		
		if serializer.is_valid():
			serializer.save()
			
			return Response({'status':'Persona Registrado'})
		else:
			return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

	@action(detail=True, methods=['get'])
	def getPersona(self, request,idpersona=None):
		if idpersona == None:
			queryset = Persona.objects.all()
			serializer = PersonaSerializer(queryset, many=True)
			return Response(serializer.data)
		else:	
			queryset = Persona.objects.all()
			persona = get_object_or_404(queryset, pk=idpersona)
			serializer = PersonaSerializer(persona)
			return Response(serializer.data)	

	@action(detail=True, methods=['put'])
	def putPersona(self, request):
		
		persona = self.get_object(request.data["persona_codigo"])
		serializer = PersonaSerializer(persona, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)		
	
	def get_object(self, persona_codigo):
		try:
			return Persona.objects.get(persona_codigo=persona_codigo)
		except Persona.DoesNotExist:
			raise Http404

class PublicidadController(viewsets.ModelViewSet):
    
	queryset = Publicidad.objects.all()
	serializer_class = PostPublicidadSerializer

	@action(detail=True, methods=['post'])
	def postPublicidad(self, request):
		content=self.request.FILES.get('file_uploaded')
		default_storage.save(django_settings.STATIC_ROOT+'/'+content.name, ContentFile(content.read()))
		dataPublicidad={}
		if 'video' in content.content_type:
			dataPublicidad['publicidad_tipo']='VIDEO'
		elif 'audio' in content.content_type:
			dataPublicidad['publicidad_tipo']='AUDIO'
		elif 'image' in content.content_type:
			dataPublicidad['publicidad_tipo']='IMAGEN'
		else:
			return Response("Tipo de archivo no permitido -->"+content.content_type+"<--",status=status.HTTP_400_BAD_REQUEST)
		

		dataPublicidad['publicidad_ruta']=content.name
		
		serializer=PublicidadSerializer(data=dataPublicidad)
		
		if serializer.is_valid():
			serializer.save()
			
			return Response({'status':'Publicidad Registrada'})
		else:
			return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

	@action(detail=True, methods=['get'])
	def getPublicidad(self, request,idpublicidad=None):
		if idpublicidad == None:
			queryset = Publicidad.objects.all()
			serializer = PublicidadSerializer(queryset, many=True)
			return Response(serializer.data)
		else:	
			queryset = Publicidad.objects.all()
			persona = get_object_or_404(queryset, pk=idpublicidad)
			serializer = PublicidadSerializer(persona)
			return Response(serializer.data)		

	@action(detail=True, methods=['put'])
	def putPublicidad(self, request):
		
		publicidad = self.get_object(request.data["publicidad_codigo"])
		serializer = PublicidadSerializer(publicidad, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)		
	
	def get_object(self, publicidad_codigo):
		try:
			return Publicidad.objects.get(publicidad_codigo=publicidad_codigo)
		except Publicidad.DoesNotExist:
			raise Http404


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]
    
def tts(texto, language, archivo):
    if os.path.exists(archivo):
        print ("File exist")
    else:
        print ("File not exist")
        tts = gTTS(text=texto, lang=language, slow=False) 
        # Guardamos el archivo de Audio
        tts.save(archivo)
