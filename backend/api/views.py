from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import EstadoPedido, Usuario, Tipo_usuario
from django.contrib.auth.hashers import make_password
from rest_framework import viewsets, generics
from .models import Producto, Categoria, Marca, ImagenProducto, Sucursal, StockSucursal, Pedido, DetalleProducto, Contacto
from .serializers import *
import json
from .webpay_config import get_webpay_transaction
from transbank.error.transbank_error import TransbankError
from transbank.webpay.webpay_plus.transaction import Transaction
from django.utils import timezone
import requests
import bcchapi
from rest_framework.decorators import api_view
from rest_framework.response import Response

tx = get_webpay_transaction()

# @api_view(['GET'])
# def hello(request):
#     return Response({"message": "Hola desde Djando API"})

# @api_view(['GET'])
# def productos(request):
#     data = [
#         {"id": 1, "nombre": "Camisa", "precio": 15000},
#         {"id": 2, "nombre": "Pantalón", "precio": 25000},
#     ]
#     return Response(data)

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
            'direccion': getattr(user, 'dir_usuario', ''),
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

@api_view(['POST'])
def webpay_create_transaction(request):
    data = request.data
    buy_order = data.get('buy_order')
    session_id = data.get('session_id')
    amount = data.get('amount')
    return_url = data.get('return_url')

    tx = get_webpay_transaction()
    resp = tx.create(buy_order, session_id, amount, return_url)
    return Response({'url': resp['url'], 'token': resp['token']})

@api_view(['POST'])
@permission_classes([AllowAny])
def webpay_commit(request):
    token_ws = request.data.get('token_ws')
    if not token_ws:
        return Response({'error': 'No se recibió token_ws'}, status=400)

    tx = get_webpay_transaction()
    try:
        resp = tx.commit(token_ws)
        buy_order = resp['buy_order']
        status = resp['status']
        # ... extrae el pedido_id como antes ...
        def extraer_id_de_buy_order(buy_order):
            try:
                return int(buy_order.split('-')[1])
            except Exception:
                return None

        pedido_id = extraer_id_de_buy_order(buy_order)
        if not pedido_id:
            return Response({'error': 'No se pudo extraer el id del pedido'}, status=400)
        try:
            pedido = Pedido.objects.get(id=pedido_id)
        except Pedido.DoesNotExist:
            return Response({'error': 'Pedido no encontrado'}, status=404)
        if status == 'AUTHORIZED':
            estado_pagado = EstadoPedido.objects.get(nombre_estado_pedido='Aprobado')
            pedido.estado_pedido = estado_pagado
        else:
            estado_cancelado = EstadoPedido.objects.get(nombre_estado_pedido='Cancelado')
            pedido.estado_pedido = estado_cancelado
        pedido.save()
        return Response({
            'success': True,
            'pedido_id': pedido.id,
            'nuevo_estado': pedido.estado_pedido.nombre_estado_pedido,
            'buy_order': buy_order,
            'status': status,
            # ...otros datos de resp si quieres mostrarlos...
        })
    except Exception as e:
        return Response({'error': str(e)}, status=500)

# ViewSets
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

    def get_queryset(self):
        queryset = super().get_queryset()
        sucursal = self.request.query_params.get('sucursal')
        producto = self.request.query_params.get('producto')
        if sucursal:
            queryset = queryset.filter(sucursal_id=sucursal)
        if producto:
            queryset = queryset.filter(producto_id=producto)
        return queryset

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class DetalleProductoViewSet(viewsets.ModelViewSet):
    queryset = DetalleProducto.objects.all()
    serializer_class = DetalleProductoSerializer

class ContactoViewSet(viewsets.ModelViewSet):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer

class TipoUsuarioViewSet(viewsets.ModelViewSet):
    queryset = Tipo_usuario.objects.all()
    serializer_class = TipoUsuarioSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

# Métodos específicos
@api_view(['GET'])
def productos_list(request):
    productos = Producto.objects.all()
    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def producto_detalle(request, codigo):
    try:
        producto = Producto.objects.get(id=codigo)
        serializer = ProductoSerializer(producto)
        return Response(serializer.data)
    except Producto.DoesNotExist:
        return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def categorias_list(request):
    categorias = Categoria.objects.all()
    serializer = CategoriaSerializer(categorias, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def sucursal_stock(request, codigo):
    stock = StockSucursal.objects.filter(sucursal_id=codigo)
    serializer = StockSucursalSerializer(stock, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def realizar_pedido(request):
     serializer = PedidoSerializer(data=request.data)
     if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=201)
     return Response(serializer.errors, status=400)

@api_view(['POST'])
def contacto(request):
     serializer = ContactoSerializer(data=request.data)
     if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=201)
     return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def guardar_carrito(request):
    data = request.data
    cart = data.get('cart', [])
    if not cart:
        return Response({'error': 'El carrito está vacío'}, status=400)
    try:
        # Obtener o crear el estado 'Pago pendiente'
        estado_pendiente, _ = EstadoPedido.objects.get_or_create(nombre_estado_pedido='Pago pendiente')
        pedido = Pedido.objects.create(
            usuario=request.user,
            estado_pedido=estado_pendiente,
            fecha_pedido=timezone.now().date(),
            total_pedido=sum(float(item.get('price', 0)) * int(item.get('quantity', 0)) for item in cart)
        )
        for item in cart:
            producto_id = item.get('id')
            cantidad = item.get('quantity')
            try:
                producto = Producto.objects.get(id=producto_id)
            except Producto.DoesNotExist:
                return Response({'error': f'Producto con id {producto_id} no existe'}, status=400)
            DetalleProducto.objects.create(
                pedido=pedido,
                producto=producto,  # Usa la instancia, no el id
                cantidad_productos=int(cantidad),
                subtotal_producto=float(item.get('price', 0)) * int(cantidad)
            )
        return Response({'pedido_id': pedido.id, 'status': 'Carrito guardado'})
    except Exception as e:
        print("ERROR EN GUARDAR_CARRITO:", e)
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def moneda_convertir(request):
    monto = float(request.GET.get('monto', 1))
    moneda = request.GET.get('moneda', 'CLP')

    # Solo soportamos CLP a USD
    if moneda != "CLP":
        return Response({"error": "Solo se soporta conversión CLP a USD"}, status=400)

    try:
        siete = bcchapi.Siete("gastonzamora2013@gmail.com", "xz4pV7e84q3.ieX")
        # Usar cuadro para obtener el dólar observado
        df = siete.cuadro(series=["F073.TCO.PRE.Z.D"], nombres=["dolar"])
        if df is None or df.empty:
            print("bcchapi: DataFrame vacío o None")
            return Response({"error": "No se pudo obtener el valor del dólar (sin datos)"}, status=500)
        valor_ultimo = float(df["dolar"].dropna().iloc[-1])
    except Exception as e:
        print("ERROR EN MONEDA_CONVERTIR:", e)
        return Response({"error": f"No se pudo obtener el valor del dólar: {str(e)}"}, status=500)

    monto_usd = monto / valor_ultimo

    return Response({
        "moneda_origen": "CLP",
        "moneda_destino": "USD",
        "valor_cambio": valor_ultimo,
        "monto_origen": monto,
        "monto_convertido": round(monto_usd, 2)
    })