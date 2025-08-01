from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from .models import Habit, Checkin
from .serializers import HabitSerializer, CheckinSerializer

class HabitViewSet(viewsets.ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer
    permission_classes = [AllowAny]  

    def perform_create(self, serializer):
        serializer.save()  


class CheckinViewSet(viewsets.ModelViewSet):
    queryset = Checkin.objects.all()
    serializer_class = CheckinSerializer
    permission_classes = [AllowAny]  

    def perform_create(self, serializer):
        serializer.save()  


class HabitCreateView(generics.CreateAPIView):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save()  
