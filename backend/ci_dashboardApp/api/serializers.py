from rest_framework import serializers
from ci_dashboardApp.models import CI, Job, Token

from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email"
        )


class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = "__all__"


class CISerializer(serializers.ModelSerializer):
    jobs = JobSerializer(many=True, read_only=True)
    type = serializers.ChoiceField(
        choices=['JENKINS', 'TRAVIS', 'CIRCLE', 'GITHUB'])
    access = serializers.ChoiceField(choices=['Private', 'Public'])

    class Meta:
        model = CI
        fields = "__all__"


class TokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Token
        fields = "__all__"
