from rest_framework import serializers
from .models import Antecedent, Examen,ExamenRadiologique,ExamenBiologique, DossierPatient, Consultation,CompteRendu,Medicament,OrdonnanceMedicament,CertificatMedical,Soin,Ordonnance

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'

class AddConsultationSerializer(serializers.Serializer):
    consultation_id = serializers.IntegerField()

    def validate_consultation_id(self, value):
        """
        Validate if the consultation exists.
        """
        if not Consultation.objects.filter(id=value).exists():
            raise serializers.ValidationError({"consultation_id": "Consultation not found."})
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


class ExamenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examen
        fields = '__all__'

    def to_representation(self, instance):
        """
        If the instance is an ExamenBiologique, return the ExamenBiologiqueSerializer data.
        If the instance is an ExamenRadiologique, return the ExamenRadiologiqueSerializer data.
        """
        if isinstance(instance, ExamenBiologique):
            serializer = ExamenBiologiqueSerializer(instance, context=self.context)
        elif isinstance(instance, ExamenRadiologique):
            serializer = ExamenRadiologiqueSerializer(instance, context=self.context)
        else:
            serializer = self.__class__(instance, context=self.context)

        return serializer.data

class ExamenBiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamenBiologique
        fields = '__all__'

class ExamenRadiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamenRadiologique
        fields = '__all__'

class CompteRenduSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompteRendu
        fields = '__all__'

class OrdonnanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordonnance
        fields = '__all__'

class OrdonnanceMedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdonnanceMedicament
        fields = '__all__'

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'

class SoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soin
        fields = '__all__'

class CertificatMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificatMedical
        fields = '__all__'