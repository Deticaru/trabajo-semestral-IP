from django.db import models

# Create your models here.
class Producto(models.Model):
    nombre_prod = models.CharField(max_length=100)
    precio_prod = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre_prod