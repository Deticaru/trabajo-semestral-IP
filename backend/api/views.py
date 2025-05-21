from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Usuario, Tipo_usuario
from django.contrib.auth.hashers import make_password
import json

@api_view(['GET'])
def hello(request):
    return Response({"message": "Hola desde Djando API"})

@api_view(['GET'])
def productos(request):
    data = [
        {"id": 1, "nombre": "Camisa", "precio": 15000},
        {"id": 2, "nombre": "Pantalón", "precio": 25000},
    ]
    return Response(data)

@csrf_exempt
def vista_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success':True})
        else:
            return JsonResponse({'sucess':False, 'error': 'Credenciales Inválidas'}, status=401)

@api_view(['POST'])
def registrar_usuario(request):
    data = request.data
    try:
        tipo_cliente, _ = Tipo_usuario.objects.get_or_create(nom_tipo='Cliente')
        usuario = Usuario.objects.create(
            nom_usuario=data['nom_usuario'],
            correo_usuario=data['correo_usuario'],
            telefono_usuario=data['telefono_usuario'],
            recibe_ofertas=data.get('recibe_ofertas', False),
            tipo_usuario=tipo_cliente,
            password=make_password(data['password'])
        )
        return Response({'success': True, 'msg': 'Usuario creado correctamente'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'success': False, 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user

    if request.method == 'GET':
        return Response({
            'nom_usuario': user.nom_usuario,
            'correo_usuario': user.correo_usuario,
            'telefono_usuario': user.telefono_usuario,
            'direccion': getattr(user, 'dir_usuario', ''),  # Mapear correctamente el campo dirección
        })

    if request.method == 'PUT':
        data = request.data
        updated = False
        if 'nom_usuario' in data and data['nom_usuario'] != user.nom_usuario:
            user.nom_usuario = data['nom_usuario']
            updated = True
        if 'telefono_usuario' in data and data['telefono_usuario'] != user.telefono_usuario:
            user.telefono_usuario = data['telefono_usuario']
            updated = True
        if 'direccion' in data and data['direccion'] != getattr(user, 'dir_usuario', ''):
            user.dir_usuario = data['direccion']
            updated = True
        if 'password' in data and data['password']:
            user.set_password(data['password'])
            updated = True
        if updated:
            user.save()
            return Response({'success': True, 'msg': 'Datos actualizados correctamente'})
        else:
            return Response({'success': False, 'msg': 'No hay cambios para actualizar'}, status=status.HTTP_200_OK)
# Create your views here.
