from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

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
    nom_prod        = models.CharField(max_length=100, verbose_name='Nombre Producto')
    desc_prod       = models.CharField(max_length=1500, verbose_name='Descripción Producto')
    precio_prod     = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Precio Producto')
    marca_prod      = models.ForeignKey(Marca, on_delete=models.CASCADE, verbose_name='Marca Producto')
    tag_prod        = models.ForeignKey(Categoria, on_delete=models.CASCADE, verbose_name='Categoría Producto')

    def __str__(self):
        return self.nom_prod

