import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'server.settings')
import django
django.setup()
from backend_db.models import HistoricWind

for row in HistoricWind.objects.all().reverse():
    if HistoricWind.objects.filter(
        height_above_ground = row.height_above_ground,
        date_val = row.date_val,
        longitude = row.longitude,
        latitude = row.latitude,
        u_comp = row.u_comp,
        v_comp = row.v_comp).count() > 1:
        row.delete()