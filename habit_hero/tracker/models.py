from django.db import models

# Create your models here.

from django.contrib.auth.models import User

class Habit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    frequency = models.CharField(max_length=10, choices=[('daily', 'Daily'), ('weekly', 'Weekly')])
    start_date = models.DateField()


    def __str__(self):
        return self.name


class Checkin(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name='checkins')
    date = models.DateField()
    note = models.TextField(blank=True)

    def __str__(self):
        return f'{self.habit.name} on {self.date}'
