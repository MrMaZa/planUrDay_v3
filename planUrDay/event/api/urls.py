from django.conf.urls import url
from django.urls import path

from event.views import EventManageView
from .views import EventListCreate

urlpatterns = [
    path('event/', EventListCreate.as_view()),
    path('event/form/', EventManageView.as_view()),
    path('event/form/<pk>', EventManageView.as_view()),
]
