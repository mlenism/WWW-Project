from http.client import ImproperConnectionState
import imp
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from UserApp.models import Usuario
from UserApp.serializers import UsuarioSerializer

@csrf_exempt
def UsuarioApi(request):
    if request.method == 'GET':
        usuarios = Usuario.objects.all()
        usuarios_serializer = UsuarioSerializer(usuarios, many=True)
        return JsonResponse(usuarios_serializer.data, safe=False)
    elif request.method == 'POST':
        return JsonResponse(request) # Por modificar
    elif request.method == 'PUT':
        return JsonResponse(request) # Por modificar
    elif request.method == 'DELETE':
        return JsonResponse(request) # Por modificar