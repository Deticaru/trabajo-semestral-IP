from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, generics
from .models import Producto, Categoria, Marca, ImagenProducto, Sucursal, StockSucursal, Pedido, DetalleProducto, Contacto
from .serializers import *
from rest_framework import status
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
# Create your views here.
# Crear funciones o clases para cada endpoint

# Los siguientes metodos son mas flexibles pero no tines control de los endpoints
# Permite usar post, put, delete, get de una sola vez
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class MarcaViewSet(viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer

class ImagenProductoViewSet(viewsets.ModelViewSet):
    queryset = ImagenProducto.objects.all()
    serializer_class = ImagenProductoSerializer

class SucursalViewSet(viewsets.ModelViewSet):
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer

class StockSucursalViewSet(viewsets.ModelViewSet):
    queryset = StockSucursal.objects.all()
    serializer_class = StockSucursalSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class DetalleProductoViewSet(viewsets.ModelViewSet):
    queryset = DetalleProducto.objects.all()
    serializer_class = DetalleProductoSerializer

class ContactoViewSet(viewsets.ModelViewSet):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer

#Estos metodos son mas especificos y debes operarlos manualmente
@api_view(['GET'])
def productos_list(request):
    productos = Producto.objects.all()
    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data)
    #return Response({"message": "Listado de productos"})

@api_view(['GET'])
def producto_detalle(request, codigo):
    try:
        producto = Producto.objects.get(id=codigo)
        serializer = ProductoSerializer(producto)
        return Response(serializer.data)
    except Producto.DoesNotExist:
        return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    #return Response({"message": f"Detalle de producto {codigo}"})

@api_view(['GET'])
def categorias_list(request):
    categorias = Categoria.objects.all()
    serializer = CategoriaSerializer(categorias, many=True)
    return Response(serializer.data)
    #return Response({"message": "Lista de categorías"})

@api_view(['GET'])
def sucursal_stock(request, codigo):
    stock = StockSucursal.objects.filter(sucursal_id=codigo)
    serializer = StockSucursalSerializer(stock, many=True)
    return Response(serializer.data)
    #return Response({"message": f"Stock por sucursal {id}"})

@api_view(['POST'])
def realizar_pedido(request):
     serializer = PedidoSerializer(data=request.data)
     if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=201)
     return Response(serializer.errors, status=400)
    #return Response({"message": "Pedido realizado"})

@api_view(['POST'])
def contacto(request):
     serializer = ContactoSerializer(data=request.data)
     if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=201)
     return Response(serializer.errors, status=400)
    #return Response({"message": "Mensaje de contacto recibido"})

@api_view(['GET'])
def moneda_convertir(request):
    # Aquí deberías consumir la API del Banco Central y retornar la conversión
    return Response({"message": "Conversión de moneda"})