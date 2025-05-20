from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.conf import settings # Hace referencia al modelo Usuario personalizado
#from django.utils.html import mark_safe
class Tipo_usuario(models.Model):
    nom_tipo        = models.CharField(max_length=30, verbose_name='Nombre Tipo Usuario')

    def __str__(self):
        return self.nom_tipo
    
class UsuarioManager(BaseUserManager):
    def create_user(
            self,
            nom_usuario,
            correo_usuario,
            telefono_usuario=None,
            password=None,
            **extra_fields
    ):
        if not correo_usuario:
            raise ValueError('El correo electrónico es obligatorio')
        if not telefono_usuario:
            raise ValueError('El teléfono es obligatorio')
        email = self.normalize_email(correo_usuario)
        user = self.model(
            nom_usuario=nom_usuario, 
            correo_usuario=email,
            telefono_usuario=telefono_usuario,
            **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(
        self,
        nom_usuario, 
        correo_usuario,
        password=None, 
        **extra_fields):
    
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        from .models import Tipo_usuario
        admin_tipo, _ = Tipo_usuario.objects.get_or_create(nom_tipo='Administrador')
        extra_fields.setdefault('tipo_usuario', admin_tipo)

        return self.create_user(
            nom_usuario=nom_usuario,
            correo_usuario=correo_usuario,
            telefono_usuario='999999999',  # usa un valor dummy para superusuario
            password=password,
            **extra_fields
        )

class Usuario(AbstractBaseUser, PermissionsMixin):
    nom_usuario         = models.CharField(max_length=150, verbose_name='Nombre Usuario')
    correo_usuario      = models.EmailField(unique=True, verbose_name='Correo Usuario')
    recibe_ofertas      = models.BooleanField(default=False, verbose_name='Recibe Ofertas')
    telefono_usuario    = models.CharField(max_length=20, verbose_name='Teléfono Usuario')
    tipo_usuario        = models.ForeignKey(Tipo_usuario, on_delete=models.PROTECT, verbose_name='Tipo Usuario')
    is_active           = models.BooleanField(default=True)
    is_staff            = models.BooleanField(default=True)

    USERNAME_FIELD = 'correo_usuario'
    REQUIRED_FIELDS = ['nom_usuario']

    objects = UsuarioManager()

    def __str__(self):
        return str(self.tipo_usuario) + str(self.correo_usuario)


class Marca(models.Model):
    nom_marca       = models.CharField(max_length=50, verbose_name='Nombre Marca')

    def __str__(self):
        return self.nom_marca

class Categoria(models.Model):
    nom_categoria   = models.CharField(max_length=50, verbose_name='Nombre Categoría')
    def __str__(self):
        return self.nom_categoria

# Create your models here.
class Producto(models.Model):
    nom_producto        = models.CharField(max_length=100, verbose_name='Nombre Producto')
    desc_producto       = models.CharField(max_length=1500, verbose_name='Descripción Producto')
    precio_producto     = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Precio Producto')
    marca_producto      = models.ForeignKey(Marca, on_delete=models.CASCADE, verbose_name='Marca Producto')
    tag_producto        = models.ForeignKey(Categoria, on_delete=models.CASCADE, verbose_name='Categoría Producto')

    def __str__(self):
        return self.nom_producto

class ImagenProducto(models.Model):
    producto        = models.ForeignKey('Producto', on_delete=models.CASCADE, related_name='imagenes')
    imagen_producto = models.ImageField(upload_to='productos/', verbose_name='Imagen del Producto')
    puesto_imagen   = models.PositiveIntegerField(verbose_name='Puesto de Imagen')

    def __str__(self):
        return f"{self.producto.nom_producto} - Imagen #{self.puesto_imagen}"
    #Probando este segmento
    # def imagen_tag(self):
    #     if self.imagen_producto:
    #         return mark_safe(f'<img src="{self.imagen_producto.url}" width="100" />')
    #     return "Sin imagen"
    # imagen_tag.short_description = 'Imagen'

class Comuna(models.Model):
    nom_comuna      = models.CharField(max_length=100, verbose_name='Nombre Comuna')
    codigo_postal   = models.CharField(max_length=10, verbose_name='Código Postal')

    def __str__(self):
        return self.nom_comuna
    
class Sucursal(models.Model):
    nom_sucursal        = models.CharField(max_length=100, verbose_name='Nombre Sucursal')
    direccion_sucursal  = models.CharField(max_length=255, verbose_name='Dirección Sucursal')
    comuna_sucursal     = models.ForeignKey(Comuna, on_delete=models.PROTECT, verbose_name='Comuna Sucursal')

    def __str__(self):
        return self.nom_sucursal

class StockSucursal(models.Model):
    stock  = models.PositiveIntegerField(verbose_name='Stock Disponible')
    sucursal        = models.ForeignKey(Sucursal, on_delete=models.CASCADE, verbose_name='Sucursal')
    producto        = models.ForeignKey(Producto, on_delete=models.CASCADE, verbose_name='Producto')

    def __str__(self):
        return f"{self.sucursal} - {self.producto} : {self.stock} unidades"

class Informe(models.Model):
    fecha_informe   = models.DateField(verbose_name='Fecha del Informe')
    total_ventas    = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Total de Ventas')
    reporte_informe = models.TextField(verbose_name='Reporte del Informe')
    sucursal        = models.ForeignKey(Sucursal, on_delete=models.CASCADE, verbose_name='Sucursal')
    def __str__(self):
        return f"Informe {self.id} - {self.sucursal} - {self.fecha_informe}"
    
class EstadoPedido(models.Model):
    nombre_estado_pedido = models.CharField(max_length=50, verbose_name='Estado del Pedido')

    def __str__(self):
        return self.nombre_estado_pedido

class Pedido(models.Model):
    fecha_pedido    = models.DateField(verbose_name='Fecha del Pedido')
    total_pedido    = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Total del Pedido')
    estado_pedido   = models.ForeignKey(EstadoPedido, on_delete=models.PROTECT, verbose_name='Estado del Pedido')
    usuario         = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Usuario") # settings.AUTH_USER_MODEL hace referencia al modelo Usuario personalizado
    def __str__(self):
        return f"Pedido {self.id} - {self.estado_pedido}"

class DetalleProducto(models.Model):
    cantidad_productos  = models.PositiveIntegerField(verbose_name='Cantidad de Productos')
    subtotal_producto   = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Subtotal')
    producto            = models.ForeignKey(Producto, on_delete=models.CASCADE, verbose_name='Producto')
    pedido              = models.ForeignKey(Pedido, on_delete=models.CASCADE, verbose_name='Pedido')

    def __str__(self):
        return f"{self.cantidad_productos} x {self.producto} (Pedido {self.pedido.id})"

class EstadoDespacho(models.Model):
    nom_estado_despacho = models.CharField(max_length=50, verbose_name="Nombre Estado Despacho")

    def __str__(self):
        return self.nom_estado_despacho

class Despacho(models.Model):
    pedido              = models.OneToOneField(Pedido, on_delete=models.CASCADE, verbose_name='Pedido')
    direccion_despacho  = models.CharField(max_length=255, verbose_name='Dirección de Despacho')
    fecha_despacho      = models.DateField(verbose_name='Fecha de Despacho')
    estado_despacho     = models.ForeignKey(EstadoDespacho, on_delete=models.PROTECT, verbose_name="Estado del Despacho")
    def __str__(self):
        return f"Despacho {self.id} - Pedido {self.pedido.id}"

class MetodoPago(models.Model):
    nom_metodo_pago = models.CharField(max_length=50, verbose_name="Método de Pago")

    def __str__(self):
        return self.nom_metodo_pago

class Banco(models.Model):
    nombre_banco = models.CharField(max_length=50, verbose_name="Nombre del Banco")

    def __str__(self):
        return self.nombre_banco

class TipoPago(models.Model):
    nom_tipo_pago = models.CharField(max_length=50, verbose_name="Tipo de Pago")

    def __str__(self):
        return self.nom_tipo_pago

class PagoPedido(models.Model):
    pedido      = models.OneToOneField('Pedido', on_delete=models.CASCADE, verbose_name="Pedido")
    monto_pago  = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Monto del Pago")
    fecha_pago  = models.DateField(verbose_name="Fecha del Pago")
    metodo_pago = models.ForeignKey(MetodoPago, on_delete=models.PROTECT, verbose_name="Método de Pago")
    banco       = models.ForeignKey(Banco, on_delete=models.PROTECT, verbose_name="Banco")
    tipo_pago   = models.ForeignKey(TipoPago, on_delete=models.PROTECT, verbose_name="Tipo de Pago")

    def __str__(self):
        return f"Pago de Pedido {self.pedido.id} - {self.monto_pago} CLP"