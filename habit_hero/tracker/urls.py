from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabitViewSet, CheckinViewSet, HabitCreateView


router = DefaultRouter()
router.register(r'habits', HabitViewSet)
router.register(r'checkins', CheckinViewSet)

urlpatterns = [
    path('habits/create/', HabitCreateView.as_view(), name='habit-create'), 
    path('', include(router.urls)),  
]
