from rest_framework import serializers

from event.models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            'id', 'eventType', 'eventCategory', 'subject', 'place',
            'description')

    def create(self, validated_data):
        data = validated_data.copy()
        data['user'] = self.context['request'].user

        return super(EventSerializer, self).create(data)
