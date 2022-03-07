from xml.etree.ElementInclude import include
from django.urls import path
from .views import index


urlpatterns = [
    path('', index, name='index'),
]