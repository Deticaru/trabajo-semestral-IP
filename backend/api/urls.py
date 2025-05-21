from django.urls import path
from .views import *

urlpatterns = [
    path('hello/', hello),
    path('login/', vista_login),
    path('registrar/', registrar_usuario, name='registrar_usuario'),
    path('profile/', profile, name='profile'),
]
