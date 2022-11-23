from django.db import models
from backend_db.elexon_model import ActualProduceElectricity
from django.contrib.auth.models import User
# Create your models here.

class HistoricWind(models.Model):
    wind_data_id = models.IntegerField(primary_key = True, unique = True, auto_created = True)
    height_above_ground = models.IntegerField(blank = False)
    date_val = models.DateTimeField(blank = False)
    longitude = models.FloatField(blank = False)
    latitude = models.FloatField(blank = False)
    u_comp = models.FloatField(blank = False)
    v_comp = models.FloatField(blank = False)

class UserProfile(models.Model):
    # This line is links UserProfile to a User model instance.
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # The additional attributes we wish to include.
    website = models.URLField(blank=True)
    picture = models.ImageField(upload_to='profile_images', blank=True)
    def __str__(self):
        return self.user.username