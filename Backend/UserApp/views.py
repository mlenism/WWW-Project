from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from UserApp.models import Usuario
from UserApp.serializers import UsuarioSerializer

class UsuarioApi(APIView):

    values = ['username', 'first_name', 'last_name', 'email',
        'is_superuser', 'is_staff', 'is_active',
        'date_joined', 'password', 'sede_codigo__sede_nombre']

    def get_object(self, pk):
        try:
            return Usuario.objects.get(pk=pk)
        except Usuario.DoesNotExist:
            raise Http404

    def get(self, request, pk=None, format=None):
        if pk == None:
            usuarios = Usuario.objects.all().values(*self.values)
            serializer = UsuarioSerializer(usuarios, many=True)
        else:
            try:
                usuarios = Usuario.objects.values(*self.values).get(pk=pk)
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

    def put(self, request, pk, format=None):
        usuario = self.get_object(pk)
        serializer = UsuarioSerializer(usuario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        usuario = self.get_object(pk)
        usuario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)