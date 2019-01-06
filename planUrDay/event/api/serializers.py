from rest_framework import serializers

from event.models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            'id', 'eventType', 'eventCategory', 'subject', 'place', 'startDate', 'endDate', 'startTime', 'endTime',
            'description')

