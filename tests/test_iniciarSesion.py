import pytest
from api.models import Usuario, Tipo_usuario # type: ignore

@pytest.mark.django_db
def test_iniciar_sesion_correcto(client):
    tipo_usuario, _ = Tipo_usuario.objects.get_or_create(nom_tipo='Cliente')
    usuario = Usuario.objects.create_user(
        nom_usuario='Test User',
        correo_usuario='testuser@user.com',
        telefono_usuario='123456789',
        password='testpassword1234',
        tipo_usuario=tipo_usuario
    )

    response = client.post('/api/login/', {'username': 'testuser@user.com', 'password': 'testpassword1234'})

    assert response.status_code in [200, 302]

    user = response.wsgi_request.user
    assert user.is_authenticated
    assert user.correo_usuario == 'testuser@user.com'
    print('corrió')