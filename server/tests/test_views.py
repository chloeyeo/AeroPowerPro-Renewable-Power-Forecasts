import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

import django
django.setup()

from django.test import Client
# from django.urls import reverse
# from backend_db.views import PowerForecastViewSet, GenericWindTurbineViewSet, HistoricWindViewSet, UserView, GeolocationsView, LoginView, RegisterApiView
# import unittest

# class TestViews(unittest.TestCase):

#     def test_login_view(self):
#         client = Client()
#         response = client.get(reverse('login'))
#         self.assertEqual(200, response.status_code)

# >>> response = client.get(reverse('blog_category_list'))
# >>> response.status_code
# 200
# >>> category = Category(title='Django', slug='django')

# >>> category.save()
# >>> response = client.get(category.get_absolute_url())
# >>> response.status_code
# 200

# >>> post = Post(title='My post', slug='my-post', body='Lorem ipsum
# dolor sit amet', status=2, publish=datetime.datetime.now())
# >>> post.save()
# >>> post.categories.add(category)


# >>> response = client.get(post.get_absolute_url())
# >>> response.status_code
# 200