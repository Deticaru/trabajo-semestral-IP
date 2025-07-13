from rest_framework import serializers
from .models import Producto, Categoria, Marca, ImagenProducto, Sucursal, StockSucursal, Pedido, DetalleProducto, Contacto, Tipo_usuario, Usuario

# Marca
class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = ['id', 'nom_marca']

# Sucursal
class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'

# Categoría
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nom_categoria']

# Imágenes
class ImagenProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenProducto
        fields = ['imagen_producto', 'puesto_imagen']

# Producto
class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(source='tag_producto', read_only=True)
    marca = MarcaSerializer(source='marca_producto', read_only=True)
    marca_producto = serializers.PrimaryKeyRelatedField(
        queryset=Marca.objects.all(), write_only=True, required=True
    )
    tag_producto = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(), write_only=True, required=True
    )
    imagenes = ImagenProductoSerializer(many=True, read_only=True)

    class Meta:
        model = Producto
        fields = [
            'id',
            'nom_producto',
            'desc_producto',
            'precio_producto',
            'categoria',        # objeto anidado solo lectura
            'marca',           # objeto anidado solo lectura
            'marca_producto',  # id para escritura
            'tag_producto',    # id para escritura
            'imagenes',
            # agrega aquí otros campos que quieras mostrar
        ]

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

# Contacto
class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = '__all__'

# Tipo Usuario
class TipoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo_usuario
        fields = ['id', 'nom_tipo']

# Usuario
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

# ============= SERIALIZERS PARA API PÚBLICA =============
# Versiones simplificadas sin campos sensibles para uso externo

class PublicMarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = ['id', 'nom_marca']

class PublicCategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nom_categoria']

class PublicImagenProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenProducto
        fields = ['imagen_producto', 'puesto_imagen']

class PublicSucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = ['id', 'nom_sucursal', 'direccion_sucursal']
        # Omitimos comuna por simplificar

class PublicStockSerializer(serializers.ModelSerializer):
    sucursal = PublicSucursalSerializer(read_only=True)
    class Meta:
        model = StockSucursal
        fields = ['stock', 'sucursal']

class PublicProductoSerializer(serializers.ModelSerializer):
    categoria = PublicCategoriaSerializer(source='tag_producto', read_only=True)
    marca = PublicMarcaSerializer(source='marca_producto', read_only=True)
    imagenes = PublicImagenProductoSerializer(many=True, read_only=True)
    stock_sucursales = PublicStockSerializer(many=True, source='stocksucursal_set', read_only=True)
    
    class Meta:
        model = Producto
        fields = [
            'id',
            'nom_producto',
            'desc_producto',
            'precio_producto',
            'categoria',
            'marca',
            'imagenes',
            'stock_sucursales'
        ]
