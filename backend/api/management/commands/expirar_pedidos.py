from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from api.models import Pedido, EstadoPedido

class Command(BaseCommand):
    help = 'Marca como Expirado los pedidos con estado Pago pendiente y más de 15 minutos de antigüedad.'

    def handle(self, *args, **options):
        expirado_estado, _ = EstadoPedido.objects.get_or_create(nombre_estado_pedido='Expirado')
        limite = timezone.now() - timedelta(minutes=15)
        pedidos = Pedido.objects.filter(estado_pedido__nombre_estado_pedido='Pago pendiente', fecha_creacion__lt=limite)
        count = pedidos.update(estado_pedido=expirado_estado)
        self.stdout.write(self.style.SUCCESS(f'{count} pedidos expirados actualizados.'))
