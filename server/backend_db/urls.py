from django.urls import path # , include
from django.contrib import admin
#  path('', views.index, name='index'),
# path('backend_db/', include('backend_db.urls')),
from backend_db.views import register_view, get_elexon, get_elexon_by_date

urlpatterns = [
    path('register_users/', register_view, name='register_users'),
    path('get_elexon/', get_elexon, name='get_elexon'),
    path('get_elexon/<str:date>', get_elexon_by_date, name='get_elexon_by_date'),
]