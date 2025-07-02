import pytest
import json
from django.urls import reverse
from rest_framework.test import APIClient
from api.models import Tipo_usuario, Usuario, Marca, Categoria, Producto, Pedido, EstadoPedido


@pytest.mark.django_db
def test_creacion_producto():
    marca = Marca.objects.create(nom_marca='MarcaTest')
    categoria = Categoria.objects.create(nom_categoria='CategoriaTest')
    client = APIClient()
    url = '/api/productos/'
    data = {
        'nom_producto': 'ProductoTest',
        'desc_producto': 'Descripción de prueba',
        'precio_producto': '9990',
        'marca_producto': marca.id,
        'tag_producto': categoria.id
    }
    response = client.post(url, data, format='json')
    assert response.status_code in [201, 200]
    assert Producto.objects.filter(nom_producto='ProductoTest').exists()

@pytest.mark.django_db
def test_creacion_pedido():
    tipo_usuario, _ = Tipo_usuario.objects.get_or_create(nom_tipo='Cliente')
    user = Usuario.objects.create_user(
        nom_usuario='Pedido User',
        correo_usuario='pedido@user.com',
        telefono_usuario='123456789',
        password='pedido123',
        tipo_usuario=tipo_usuario
    )
    estado, _ = EstadoPedido.objects.get_or_create(nombre_estado_pedido='Pendiente')
    client = APIClient()
    client.force_authenticate(user=user)
    url = '/api/pedidos/'
    data = {
        'fecha_pedido': '2025-07-02',
        'total_pedido': '10000',
        'estado_pedido': estado.id,
        'usuario': user.id
    }
    response = client.post(url, data, format='json')
    assert response.status_code in [201, 200]
    assert Pedido.objects.filter(usuario=user).exists()

@pytest.mark.django_db
def test_envio_contacto():
    client = APIClient()
    url = '/api/contacto/'
    data = {
        'nombre': 'Contacto Test',
        'correo': 'contacto@test.com',
        'mensaje': 'Mensaje de prueba.'
    }
    response = client.post(url, data, format='json')
    assert response.status_code in [201, 200]
    from api.models import Contacto
    assert Contacto.objects.filter(correo='contacto@test.com').exists()

@pytest.mark.django_db
def test_actualizacion_perfil_usuario():
    tipo_usuario, _ = Tipo_usuario.objects.get_or_create(nom_tipo='Cliente')
    user = Usuario.objects.create_user(
        nom_usuario='Perfil User',
        correo_usuario='perfil@user.com',
        telefono_usuario='123456789',
        password='perfil123',
        tipo_usuario=tipo_usuario
    )
    client = APIClient()
    client.force_authenticate(user=user)
    url = '/api/profile/'
    data = {
        'nom_usuario': 'Perfil Actualizado',
        'telefono_usuario': '987654321',
        'direccion': 'Nueva dirección',
        'password': 'nuevo_pass123'
    }
    response = client.put(url, data, format='json')
    assert response.status_code == 200
    user.refresh_from_db()
    assert user.nom_usuario == 'Perfil Actualizado'
    assert user.telefono_usuario == '987654321'
    assert user.dir_usuario == 'Nueva dirección'

@pytest.mark.django_db
def test_creacion_marca():
    client = APIClient()
    url = '/api/marcas/'
    data = {'nom_marca': 'Marca Nueva'}
    response = client.post(url, data, format='json')
    assert response.status_code in [201, 200]
    assert Marca.objects.filter(nom_marca='Marca Nueva').exists()

@pytest.mark.django_db
def test_creacion_categoria():
    client = APIClient()
    url = '/api/categorias/'
    data = {'nom_categoria': 'Categoria Nueva'}
    response = client.post(url, data, format='json')
    assert response.status_code in [201, 200]
    assert Categoria.objects.filter(nom_categoria='Categoria Nueva').exists()

@pytest.mark.django_db
def test_creacion_sucursal():
    from api.models import Comuna
    comuna = Comuna.objects.create(nom_comuna='ComunaTest', codigo_postal='12345')
    client = APIClient()
    url = '/api/sucursales/'
    data = {
        'nom_sucursal': 'SucursalTest',
        'direccion_sucursal': 'Calle Falsa 123',
        'comuna_sucursal': comuna.id
    }
    response = client.post(url, data, format='json')
    assert response.status_code in [201, 200]
    from api.models import Sucursal
    assert Sucursal.objects.filter(nom_sucursal='SucursalTest').exists()
