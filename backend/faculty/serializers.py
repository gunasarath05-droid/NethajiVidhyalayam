from rest_framework import serializers
from .models import FacultyPageContent, Leadership, Department, FacultyMember

class FacultyPageContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacultyPageContent
        fields = '__all__'

class LeadershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leadership
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class FacultyMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacultyMember
        fields = '__all__'
