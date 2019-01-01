from django.contrib.auth.models import User
from django.db import models
from django.db.models import CASCADE

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
            userID=user.id
        )


class Event(models.Model):
    userID = models.ForeignKey(User, on_delete=CASCADE)
    eventType = models.CharField(max_length=18, default='Task', choices=EVENT_TYPE_CHOICES)
    eventCategory = models.CharField(max_length=10, choices=EVENT_CATEGORY_CHOICES)
    subject = models.TextField(max_length=1000)
    startDateTime = models.DateTimeField(help_text='Date and time of Event start')
    endDateTime = models.DateTimeField(help_text='Date and time of Event end')
    place = models.TextField(max_length=500, null=True, blank=True, help_text='The place where Event appears')
    description = models.TextField(max_length=500, null=True, blank=True, help_text='Description of Event')
    objects = EventQuerySet.as_manager()

    def __str__(self):
        return "Meeting {0} of type {1} on {2}-{3}".format(self.subject, self.eventType, self.startDateTime,
                                                           self.endDateTime)
