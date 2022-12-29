from django.db import models
from django.contrib.auth.models import User


class Highways(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = True     
        db_table = 'highways'


class Roads(models.Model):
    name = models.CharField(max_length=30)
    price = models.IntegerField()
    road_length = models.IntegerField()
    id_highway = models.ForeignKey(Highways, models.DO_NOTHING, db_column='id_highway')

    class Meta:
        managed = True    
        db_table = 'roads'

class Orders(models.Model):
    id_customer = models.ForeignKey(User, models.DO_NOTHING, db_column='id_customer')
    id_road = models.ForeignKey('Roads', models.DO_NOTHING, db_column='id_road')
    status = models.TextField()
    order_date = models.DateTimeField()
    order_date_finish = models.DateTimeField(auto_now=True)

    class Meta:
        managed = True      
        db_table = 'orders'

