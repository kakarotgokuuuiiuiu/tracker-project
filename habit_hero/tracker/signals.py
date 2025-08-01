from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Checkin

@receiver(post_save, sender=Checkin)
def update_habit_start_date(sender, instance, **kwargs):
    habit = instance.habit
    print("Signal triggered for habit:", habit.name)  

    first_checkin = habit.checkins.order_by('date').first()
    if first_checkin and (habit.start_date is None or habit.start_date > first_checkin.date):
        habit.start_date = first_checkin.date
        habit.save()
        print("Updated start_date to:", habit.start_date)