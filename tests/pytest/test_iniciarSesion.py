import json
import pytest
from api.models import Usuario, Tipo_usuario # type: ignore

@pytest.mark.django_db
def test_iniciar_sesion_correcto(client):
    tipo_usuario, _ = Tipo_usuario.objects.get_or_create(nom_tipo='Cliente') # Se crea variable para "tipo_usuario" de tipo 'Cliente'.
    usuario = Usuario.objects.create_user( # Se crea un usuario con los siguientes datos.
        nom_usuario='Test User',
        correo_usuario='testuser@user.com',
        telefono_usuario='123456789',
        password='testpassword1234',
        tipo_usuario=tipo_usuario
    )

    response = client.post( # Se crea variable "response" utilizando el cliente creado y se hace un POST con los datos ingresados anteriormente y se entrega en formato JSON.
        '/api/login/',
        data=json.dumps({'username': 'testuser@user.com', 'password': 'testpassword1234'}),
        content_type='application/json'
    )

    assert response.status_code in [200, 302] # Se toma el resultado de la variable "response" del POST anterior.

    user = response.wsgi_request.user # Se crea variable "user" utilizando la variable.
    assert user.is_authenticated      # Se verifica si "user" está autenticado. 

@pytest.mark.django_db
def test_iniciar_sesion_invalido(client):
    tipo_usuario, _ = Tipo_usuario.objects.get_or_create(nom_tipo='Cliente')
    usuario = Usuario.objects.create_user(
        nom_usuario='Test User',
        correo_usuario='testuser@user.com',
        telefono_usuario='123456789',
        password='testpassword1234',
        tipo_usuario=tipo_usuario
    )

    response = client.post(
        '/api/login/',
        data=json.dumps({'username': 'invalidtestuser@user.com', 'password': 'testpassword1234'}),
        content_type='application/json'
    )

    assert response.status_code == 401

    user = response.wsgi_request.user
    assert not user.is_authenticated

@pytest.mark.django_db
def test_creacion_usuario_cliente(client): # Se verifica si la creación de usuarios crea las entradas correctamente.
    tipo_usuario, _ = Tipo_usuario.objects.get_or_create(nom_tipo='Cliente')
    usuario = Usuario.objects.create_user( 
        nom_usuario='Creación de Usuario',
        correo_usuario='created_user@test.cl',
        telefono_usuario='123123123',
        password='c_user_password123',
        tipo_usuario=tipo_usuario
    )
    
    usuario_db = Usuario.objects.get(correo_usuario='created_user@test.cl')
    assert usuario_db.nom_usuario == 'Creación de Usuario'


