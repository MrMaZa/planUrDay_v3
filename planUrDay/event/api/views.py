from event.models import Event
from event.api.serializers import EventSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class EventViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    authentication_classes = TokenAuthentication
    permission_classes = (IsAuthenticated,)
    serializer_class = EventSerializer
    queryset = Event.objects.all()

    def get_queryset(self):
        return Event.objects.events_for_user(self.request.user)
