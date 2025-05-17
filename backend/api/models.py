from django.db import models

class Marca(models.Model):
    nom_marca   = models.CharField(max_length=50, verbose_name='Nombre Marca')

    def __str__(self):
        return self.nom_marca
    
# Create your models here.
class Producto(models.Model):
    nom_prod    = models.CharField(max_length=100, verbose_name='Nombre Producto')
    desc_prod   = models.CharField(max_length=1500, verbose_name='Descripción Producto')
    precio_prod = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Precio Producto')
    marca_prod  = models.ForeignKey(Marca, on_delete=models.CASCADE, verbose_name='Marca Producto')


    def __str__(self):
        return self.nom_prod
    