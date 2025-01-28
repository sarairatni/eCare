from rest_framework import serializers
from .models import Antecedent,Prescription,Examen,DossierPatient,Consultation


class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__' 

class AddConsultationSerializer(serializers.Serializer):
    consultation_id = serializers.IntegerField()

    def validate_consultation_id(self, value):
        """
        Valider si la consultation existe.
        """
        if not Consultation.objects.filter(id=value).exists():
            raise serializers.ValidationError({"consultation_id": "Consultation introuvable."})
        return value

class DossierPatientSerializer(serializers.ModelSerializer):
    consultations = ConsultationSerializer(many=True, read_only=True)

    class Meta:
        model = DossierPatient
        fields = '__all__' 

class AntecedentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Antecedent
        fields = '__all__' 

class PrescriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prescription
        fields = '__all__' 

class ExamenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Examen
        fields = '__all__'

