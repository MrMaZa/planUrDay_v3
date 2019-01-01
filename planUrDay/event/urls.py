from django.conf.urls import url
from django.urls import path

from event.views import EventManageView
from .views import EventListCreate

urlpatterns = [
    path('api/event/', EventListCreate.as_view()),
    url(r'^update/api/event/form/(?P<pk>\d+)$', EventManageView.as_view()),
    url(r'^add/api/event/form/&', EventManageView.as_view()),
]
