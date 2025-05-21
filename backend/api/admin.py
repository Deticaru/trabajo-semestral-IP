from django.contrib import admin

from .models import Producto, Usuario

# Register your models here.
admin.site.register(Producto)

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('correo_usuario', 'nom_usuario', 'telefono_usuario', 'tipo_usuario', 'recibe_ofertas')
    search_fields = ('correo_usuario', 'nom_usuario')

admin.site.register(Usuario, UsuarioAdmin)