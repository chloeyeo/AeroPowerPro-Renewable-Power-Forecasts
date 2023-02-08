from backend_db.models import ActualProduceElectricity, HistoricWind, WindFarmData
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from django.test import TestCase

class TestUser(TestCase):

    def test_create_user(self):
        user = User.objects.create_user(username='newuser',
                                 email='newuser123@gmail.com',
                                 password='useruser123')
        user.save()
        self.assertEqual(1, len(User.objects.all()))
        
    def test_delete_user(self):
        user = User.objects.create_user(username='newuser',
                                 email='newuser123@gmail.com',
                                 password='useruser123')
        user.save()
        user.delete()
        self.assertEqual(0, len(User.objects.all()))

    def test_no_duplicate_users(self):
        with self.assertRaises(IntegrityError) as context:
            user1 = User.objects.create_user(username='newuser',
                                 email='newuser123@gmail.com',
                                 password='useruser123')
            user1.save()
            user2 = User.objects.create_user(username='newuser',
                                    email='newuser123@gmail.com',
                                    password='useruser123')
            user2.save()
            self.assertEqual(1, len(User.objects.all()))

        self.assertTrue('UNIQUE constraint failed' in str(context.exception))