from rest_framework import serializers
from .models import Habit, Checkin
from datetime import date, timedelta
from .utils import get_success_rate

class CheckinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkin
        fields = '__all__'

class HabitSerializer(serializers.ModelSerializer):
    checkins = CheckinSerializer(many=True, read_only=True)
    success_rate = serializers.SerializerMethodField()
    streak = serializers.SerializerMethodField()

    class Meta:
        model = Habit
        fields = '__all__'
        

    
    def get_success_rate(self, obj):
        return get_success_rate(obj)

    def get_streak(self, obj):
        checkin_dates = set(checkin.date for checkin in obj.checkins.all())
        today = date.today()
        streak = 0

        for i in range(0, 1000):  
            day = today - timedelta(days=i)
            if day in checkin_dates:
                streak += 1
            else:
                break

        return streak
