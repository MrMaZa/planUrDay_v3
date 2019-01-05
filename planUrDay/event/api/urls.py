from django.conf.urls import url
from django.urls import path


from event.api.views import EventViewSet

# urlpatterns = [
#     path('event/', EventListCreate.as_view()),
#     path('event/form/', EventManageView.as_view()),
#     path('event/form/<pk>', EventManageView.as_view()),
# ]


from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', EventViewSet, basename='event')
urlpatterns = router.urls