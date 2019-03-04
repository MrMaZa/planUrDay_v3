from rest_framework import viewsets, status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from event.api.serializers import EventSerializer
from event.models import Event


class EventViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing event instances.
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = EventSerializer
    queryset = Event.objects.all()

    def perform_authentication(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', '')[6:]
        request.user = Token.objects.get(key=token).user
        return request.user

    def filter_queryset(self, queryset):
        return queryset.filter(user=self.request.user)

    def perform_save(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        self.perform_save(serializer)

    def perform_update(self, serializer):
        self.perform_save(serializer)
