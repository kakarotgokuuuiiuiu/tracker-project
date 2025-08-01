from datetime import date
from .models import Checkin

def get_success_rate(habit):
    if not habit.start_date:
        return 0.0

    today = date.today()
    delta_days = (today - habit.start_date).days + 1

    if delta_days <= 0:
        return 0.0

    total_checkins = habit.checkins.count()

    if habit.frequency == 'daily':
        expected_checkins = delta_days
    elif habit.frequency == 'weekly':
        expected_checkins = (delta_days // 7) + 1
    else:
        return 0.0 

    raw_rate = (total_checkins / expected_checkins) * 100
    return round(min(raw_rate, 100.0), 2)  
