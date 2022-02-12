from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from UserApp.models import Usuario
from UserApp.serializers import UsuarioSerializer

class UsuarioApi(APIView):

    def get(self, request, format=None):
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)

    def post(self):
        pass

    def put(self):
        pass

    def delete(self):
        pass