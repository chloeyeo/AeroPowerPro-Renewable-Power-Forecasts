from django.test import TestCase
from django.contrib import admin
from backend_db.models import ActualProduceElectricity, HistoricWind, WindFarmData
from django.test import TestCase, Client
from django.contrib.auth.models import User

class TestAdmin(TestCase):
    def test_all_models_are_registered(self):
        models = [HistoricWind, WindFarmData, ActualProduceElectricity]

        for model in models:
            # print(model.__name__)
            self.assertIs(
                    True,
                    admin.site.is_registered(model),
                    msg=f'Did you forget to register the "{model.__name__}" in the django-admin?')
    
    def create_user(self):
        self.username = "test_admin"
        self.password = User.objects.make_random_password()
        user, created = User.objects.get_or_create(username=self.username)
        user.set_password(self.password)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save()
        self.user = user

    def test_admin(self):
        self.create_user()
        client = Client()
        client.login(username=self.username, password=self.password)
        admin_pages = [
            "/admin/",
            # put all the admin pages for your models in here.
            "/admin/auth/",
            "/admin/auth/group/",
            "/admin/auth/group/add/",
            "/admin/auth/user/",
            "/admin/auth/user/add/",
            "/admin/password_change/"
        ]
        for page in admin_pages:
            resp = client.get(page)
            assert resp.status_code == 200
            assert "<!DOCTYPE html" in str(resp.content)