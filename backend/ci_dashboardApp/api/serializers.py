from rest_framework import serializers
from ci_dashboardApp.models import CI, Group, Job, Token

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
    branch = serializers.CharField(allow_blank=True, required=False)
    workflow = serializers.CharField(allow_blank=True, required=False)

    class Meta:
        model = Job
        fields = "__all__"


class CISerializer(serializers.ModelSerializer):
    jobs = JobSerializer(many=True, read_only=True)
    group_name = serializers.StringRelatedField(source='group', read_only=True)
    owner_name = serializers.StringRelatedField(source='owner', read_only=True)
    type = serializers.ChoiceField(
        choices=['JENKINS', 'TRAVIS', 'CIRCLE', 'GITHUB'])
    access = serializers.ChoiceField(choices=['Private', 'Public'])

    class Meta:
        model = CI
        fields = "__all__"


class GroupSerializer(serializers.ModelSerializer):
    owner_name = serializers.StringRelatedField(source='owner', read_only=True)

    class Meta:
        model = Group
        fields = "__all__"


class TokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Token
        fields = "__all__"
