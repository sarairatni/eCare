from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.permissions import BasePermission
from .models import Patient,Infirmier,Medecin,Pharmacien,Radiologue,Laborantin
from .serializers import ConsultationSerializer


class MedecinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medecin
        fields = '__all__'
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['email'] = instance.user.email  # Inclure l'email depuis le modèle User
        return representation


class InfirmierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Infirmier
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


class PharmacienSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacien
        fields = '__all__'

class RadiologueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Radiologue
        fields = '__all__'

class LaborantinSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Laborantin
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Seuls les administrateurs peuvent modifier les données
        if request.method in ['POST', 'PUT', 'DELETE']:
            return request.user.is_staff
        return True

class UserWithRoleSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role']

    def get_role(self, obj):
        if hasattr(obj, 'medecin'):
            return MedecinSerializer(obj.medecin).data
        elif hasattr(obj, 'infirmier'):
            return InfirmierSerializer(obj.Infirmier).data
        # Ajoutez d'autres rôles si nécessaire
        return None

class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        """
        Crée un utilisateur avec un mot de passe hashé.
        """
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])  # Hash du mot de passe
        user.save()
        return user