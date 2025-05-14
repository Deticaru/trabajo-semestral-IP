from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

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

# Create your views here.
