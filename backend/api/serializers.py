from rest_framework import serializers
from .models import Producto, Categoria, Marca, ImagenProducto, Sucursal, StockSucursal, Pedido, DetalleProducto, Contacto
# Marca
class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = '__all__'

# Sucursal
class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'

# Categoría
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

# Imágenes
class ImagenProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenProducto
        fields = '__all__'

# Producto
class ProductoSerializer(serializers.ModelSerializer):
    #marca_producto = MarcaSerializer()
    class Meta:
        model = Producto
        fields = '__all__'
        #fields = ['id', 'nom_producto', 'desc_producto', 'precio_producto', 'marca_producto']

# Stock Sucursal
class StockSucursalSerializer(serializers.ModelSerializer):
    sucursal = SucursalSerializer()
    class Meta:
        
        model = StockSucursal
        fields = '__all__'

# Detalle de Productos en Pedido
class DetalleProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleProducto
        fields = '__all__'

# Pedido
class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'
    
#Contacto
class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = '__all__'
