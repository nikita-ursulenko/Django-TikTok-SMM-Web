from django.contrib import admin
from .models import *

@admin.register(Order)
class MyModelAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'link', 'paid', 'completed', 'order_likes_id', 'order_views_id')

