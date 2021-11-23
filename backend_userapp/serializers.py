from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import CustomUser, Ticker


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True
    )
    username = serializers.CharField(min_length=5)
    password = serializers.CharField(min_length=5, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password', 'last_login', 'date_joined' )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class TickersSerializer(serializers.ModelSerializer):
    class Meta:
        model= Ticker
        fields = ("pk", "user", "tickers_text", "shares_holding", "bought_date")
