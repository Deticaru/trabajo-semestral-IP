# urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import ProductoViewSet, CategoriaViewSet

# Incluir los nuevos endpoints
# Ejemplo (npm run dev) http://localhost:8000/api/productos/
router = DefaultRouter()
router.register(r'productos', ProductoViewSet, basename='producto')
router.register(r'categorias', CategoriaViewSet, basename='categoria')

from .views import (
    hello, vista_login, productos_list, producto_detalle, categorias_list,
    sucursal_stock, realizar_pedido, contacto, moneda_convertir
)

urlpatterns = [
    path('hello/', hello),
    path('login/', vista_login),
    #path('productos/', productos_list),
    #path('productos/<str:codigo>/', producto_detalle),
    #path('categorias/', categorias_list),
    path('sucursales/<int:codigo>/stock/', sucursal_stock),
    path('pedidos/', realizar_pedido),
    path('contacto/', contacto),
    path('moneda/convertir/', moneda_convertir),
]
urlpatterns += router.urls  # Esta línea agrega las rutas generadas por el router