from django.urls import path # , include
from django.contrib import admin
from backend_db import views
#  path('', views.index, name='index'),
# path('backend_db/', include('backend_db.urls')),
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register_users/', views.RegisterView.as_view(), name='register_users'),
]