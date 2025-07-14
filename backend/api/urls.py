# urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

# Incluir los nuevos endpoints
# Ejemplo (npm run dev) http://localhost:8000/api/productos/
router = DefaultRouter()
router.register(r'productos', ProductoViewSet, basename='producto')
router.register(r'categorias', CategoriaViewSet, basename='categoria')
router.register(r'marcas', MarcaViewSet, basename='marca')
router.register(r'tipo_usuario', TipoUsuarioViewSet, basename='tipo_usuario')
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'sucursales', SucursalViewSet, basename='sucursal')
router.register(r'stocksucursal', StockSucursalViewSet, basename='stocksucursal')

# ============= ROUTER PARA API PÚBLICA =============
# Router separado para endpoints públicos de solo lectura
public_router = DefaultRouter()
public_router.register(r'productos', PublicProductoViewSet, basename='public-producto')
public_router.register(r'categorias', PublicCategoriaViewSet, basename='public-categoria')
public_router.register(r'marcas', PublicMarcaViewSet, basename='public-marca')
public_router.register(r'sucursales', PublicSucursalViewSet, basename='public-sucursal')

from .views import (
    vista_login, productos_list, producto_detalle, categorias_list,
    sucursal_stock, realizar_pedido, contacto, moneda_convertir, webpay_commit
)

urlpatterns = [
    path('login/', vista_login),
    path('webpay/create/', webpay_create_transaction),
    path('webpay/commit/', webpay_commit),
    path('guardar-carrito/', guardar_carrito),
    path('registrar/', registrar_usuario, name='registrar_usuario'),
    path('profile/', profile, name='profile'),
    path('reset-password/', reset_password, name='reset_password'),
    #path('productos/', productos_list),
    #path('productos/<str:codigo>/', producto_detalle),
    #path('categorias/', categorias_list),
    path('sucursales/<int:codigo>/stock/', sucursal_stock),
    path('pedidos/', realizar_pedido),
    path('contacto/', contacto),
    path('moneda/convertir/', moneda_convertir),
    path('productos', productos_list),
]
urlpatterns += router.urls  # Esta línea agrega las rutas generadas por el router

# ============= RUTAS PARA API PÚBLICA =============
# Endpoints públicos bajo /api/public/
urlpatterns += [
    path('public/', include(public_router.urls)),
]