"""
task1 URL Configuration
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from highlighter import views


router = routers.DefaultRouter()
router.register(r'notes', views.NoteViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('api/', include(router.urls)),
]
