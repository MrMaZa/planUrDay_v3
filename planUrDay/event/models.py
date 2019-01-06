from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models import CASCADE
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from rest_framework.authtoken.models import Token

EVENT_TYPE_CHOICES = (
    ('Appointment', 'Appointment'),
    ('Meeting', 'Meeting'),
    ('Task', 'Task'),
    ('All_day', 'All day event'),
    ('Reccurence_meeting', 'Recurrence meeting')
)

EVENT_CATEGORY_CHOICES = (
    ('Red', 'Red category'),
    ('Blue', 'Blue category'),
    ('Green', 'Green category'),
    ('Orange', 'Orange category'),
    ('Yellow', 'Yellow category')
)


class EventQuerySet(models.QuerySet):
    def events_for_user(self, user):
        return self.filter(
            user=user
        )


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Event(models.Model):
    user = models.ForeignKey('auth.User', related_name='events', on_delete=CASCADE)
    eventType = models.CharField(max_length=18, default='Task', choices=EVENT_TYPE_CHOICES)
    eventCategory = models.CharField(max_length=10, choices=EVENT_CATEGORY_CHOICES)
    subject = models.TextField(max_length=1000)
    startDate = models.DateField(default=timezone.now, help_text='Date of Event start')
    startTime = models.TimeField(default=timezone.now, help_text='Date of Event start')
    endDate = models.DateField(default=timezone.now, help_text='Time of Event end')
    endTime = models.TimeField(default=timezone.now, help_text='Time of Event end')
    place = models.TextField(max_length=500, null=True, blank=True, help_text='The place where Event appears')
    description = models.TextField(max_length=500, null=True, blank=True, help_text='Description of Event')
    objects = EventQuerySet.as_manager()

    def __str__(self):
        return "Meeting {0} of type {1} on {2}-{3}".format(self.subject, self.eventType, self.startDate,
                                                           self.endDate)
