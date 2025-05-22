from django.contrib import admin

from .models import (
    Tipo_usuario,
    Usuario,
    Marca,
    Categoria,
    Producto,
    ImagenProducto,
    Comuna,
    Sucursal,
    StockSucursal,
    Informe,
    EstadoPedido,
    Pedido,
    DetalleProducto,
    EstadoDespacho,
    Despacho,
    MetodoPago,
    Banco,
    TipoPago,
    PagoPedido,
    Contacto
)
# Register your models here.
# Despues usar python manage.py makemigrations y python manage.py migrate
admin.site.register(Tipo_usuario)
admin.site.register(Usuario)
admin.site.register(Marca)
admin.site.register(Categoria)
admin.site.register(Producto)
admin.site.register(ImagenProducto)
admin.site.register(Comuna)
admin.site.register(Sucursal)
admin.site.register(StockSucursal)
admin.site.register(Informe)
admin.site.register(EstadoPedido)
admin.site.register(Pedido)
admin.site.register(DetalleProducto)
admin.site.register(EstadoDespacho)
admin.site.register(Despacho)
admin.site.register(MetodoPago)
admin.site.register(Banco)
admin.site.register(TipoPago)
admin.site.register(PagoPedido)
admin.site.register(Contacto)