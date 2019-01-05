from django.contrib import admin
from .models import *


@admin.register(Event)
class AdminEvent(admin.ModelAdmin):
    list_display = ('subject', 'eventType', 'eventCategory', 'startDate', 'endDate', 'place', 'description')
    list_editable = ('eventType', 'eventCategory', 'startDate', 'endDate')

