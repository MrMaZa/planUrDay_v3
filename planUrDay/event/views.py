from rest_framework import generics
from rest_framework.generics import UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from event.models import Event
from event.api.serializers import EventSerializer


class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDetailsView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventUpdateView(UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDestroyView(DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class BaseManageView(APIView):
    """
        The base class for ManageViews
            A ManageView is a view which is used to dispatch the requests to the appropriate views
            This is done so that we can use one URL with different methods (GET, PUT, etc)
    """

    def dispatch(self, request, *args, **kwargs):
        if not hasattr(self, 'VIEWS_BY_METHOD'):
            raise Exception('VIEWS_BY_METHOD static dictionary variable must be defined on a ManageView class!')
        if request.method in self.VIEWS_BY_METHOD:
            return self.VIEWS_BY_METHOD[request.method]()(request, *args, **kwargs)

        return Response(status=405)


class EventManageView(BaseManageView):
    VIEWS_BY_METHOD = {
        'DELETE': EventDestroyView.as_view,
        'GET': EventDetailsView.as_view,
        'PUT': EventUpdateView.as_view,
        'PATCH': EventUpdateView.as_view
    }
