import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
import django
django.setup()
from backend_db.models import WeatherForecast
from django.utils.timezone import now


def delete_old_forecasts(date = now()):
    old_forecasts = WeatherForecast.objects.filter(date_val__lt=date)
    if len(old_forecasts) == 0 :
        print(f"No forecasts found to delete for dates before: {date}")
    else:
        old_forecasts.delete()
    print("Done")
    