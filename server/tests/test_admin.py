from django.test import TestCase
from django.contrib import admin
from backend_db.models import ActualProduceElectricity, UserProfile, HistoricWind, WindFarmData

class TestAdmin(TestCase):
    def test_all_models_are_registered(self):
        models = [HistoricWind, UserProfile, WindFarmData, ActualProduceElectricity]

        for model in models:
            # print(model.__name__)
            self.assertIs(
                    True,
                    admin.site.is_registered(model),
                    msg=f'Did you forget to register the "{model.__name__}" in the django-admin?')