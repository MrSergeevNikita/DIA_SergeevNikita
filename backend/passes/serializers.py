from rest_framework import serializers
from .models import *
from rest_framework.fields import CharField


class HighwaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Highways
        fields = '__all__'


class RoadsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roads
        fields = '__all__'

class RoadsDepthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roads
        fields = '__all__'
        depth=1

class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'

class OrdersDepthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'
        depth=2

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class LoginRequestSerializer(serializers.Serializer):
    model = User
    username = CharField(required=True)
    password = CharField(required=True)

