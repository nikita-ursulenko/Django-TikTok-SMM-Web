from django.db import models
    

class Order(models.Model):
    order_id = models.CharField(max_length=4)
    link = models.URLField()
    paid = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)
    order_likes_id = models.CharField(max_length=8)
    order_views_id = models.CharField(max_length=8)
