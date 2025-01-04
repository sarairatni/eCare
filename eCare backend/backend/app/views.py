from datetime import datetime
from venv import logger
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import *
from django.shortcuts import redirect
from django.http import JsonResponse
from .models import *
from django.utils.dateparse import parse_date
from django.contrib.auth.decorators import login_required

from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import *
import json
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView,CreateAPIView,UpdateAPIView,ListAPIView,DestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User
from .user_serializer import *
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_http_methods
from rest_framework_simplejwt.tokens import RefreshToken


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserWithRoleSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserWithRoleSerializer
    permission_classes = [IsAdminOrReadOnly]

# Chercher dossier patient avec NSS
@csrf_exempt
@require_http_methods(["GET"])
def search_dossier_patient(request, num_securite_sociale):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        dossier_patient = DossierPatient.objects.get(num_securite_sociale=num_securite_sociale)
        return JsonResponse({'date_creation': dossier_patient.date_creation, 'num_securite_sociale': dossier_patient.num_securite_sociale})
    except DossierPatient.DoesNotExist:
        return JsonResponse({'error': 'DossierPatient not found'}, status=404)

@csrf_exempt 
# Creer dossier patient
@require_http_methods(["POST"])
def create_dossier_patient(request):
    if request.method == "POST":
        try:
             
            data = json.loads(request.body.decode('utf-8'))
    
            date_creation = data.get('date_creation')
            num_securite_sociale = data.get('num_securite_sociale')

            
            # Check if required fields are provided
            if not date_creation or not num_securite_sociale:
                return JsonResponse({'error': 'Missing required fields'}, status=400)

          
            date_creation = parse_date(date_creation)  
            
            # Create the DossierPatient object and save to the database
            dossier_patient = DossierPatient.objects.create(
                date_creation=date_creation,
                num_securite_sociale=num_securite_sociale
            )
            
            
            return JsonResponse({
                'id': dossier_patient.id,
                'date_creation': dossier_patient.date_creation,
                'num_securite_sociale': dossier_patient.num_securite_sociale
            }, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    # If method is not POST, return an error message
    return JsonResponse({'error': 'Invalid method. Use POST.'}, status=405)

# Create your views here.
@api_view(['GET', 'POST'])
@csrf_exempt
# Display the patients list 
def patient_list(request):
    if request.method == 'POST':
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    patients = Patient.objects.all()
    serializer = PatientSerializer(patients, many=True)
    return Response(serializer.data)

@csrf_exempt
# display the details of a patient by specifying his id
@require_http_methods(["GET", "POST"])
def patient_detail(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        patient = Patient.objects.get(pk=id)
        return JsonResponse(model_to_dict(patient))
    except Patient.DoesNotExist:
        return JsonResponse({'error': 'Patient not found'}, status=404)

@csrf_exempt
# Delete a patient
@require_http_methods(["GET", "POST"])
def patient_destroy(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        patient = Patient.objects.get(id=id)
        patient.delete()
        return JsonResponse({'message': 'Patient deleted'}, status=200)
    except Patient.DoesNotExist:
        return JsonResponse({'error': 'Patient not found'}, status=404)


@csrf_exempt
# display medecin list
@require_http_methods(["GET", "POST"])
def medecin_list(request):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    medecins = list(Medecin.objects.all())
    medecin_dicts = [model_to_dict(medecin) for medecin in medecins]
    return JsonResponse(medecin_dicts, safe=False)

@csrf_exempt
# details of a medecin by his id
@require_http_methods(["GET", "POST"])
def medecin_detail(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        medecin = Medecin.objects.get(pk=id)
        return JsonResponse(model_to_dict(medecin))
    except Medecin.DoesNotExist:
        return JsonResponse({'error': 'Medecin not found'}, status=404)

@csrf_exempt
# delete a medecin 
@require_http_methods(["GET", "POST"])
def medecin_destroy(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        medecin = Medecin.objects.get(pk=id)
        medecin.delete()
        return JsonResponse({'message': 'Medecin deleted'}, status=200)
    except Medecin.DoesNotExist:
        return JsonResponse({'error': 'Medecin not found'}, status=404)


@csrf_exempt
# iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
@require_http_methods(["GET", "POST"]) 
def medecin_list_patients(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        medecin = Medecin.objects.get(pk=id)
        patients = medecin.patients.all()
        patient_dicts = [model_to_dict(patient) for patient in patients]
        return JsonResponse(patient_dicts, safe=False)
    except Medecin.DoesNotExist:
        return JsonResponse({'error': 'Medecin not found'}, status=404)


@csrf_exempt
@require_http_methods(["GET", "POST"])
def pharmacien_list(request):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    pharmaciens = list(Pharmacien.objects.all())
    pharmacien_dicts = [model_to_dict(pharmacien) for pharmacien in pharmaciens]
    return JsonResponse(pharmacien_dicts, safe=False)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def pharmacien_detail(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        pharmacien = Pharmacien.objects.get(pk=id)
        return JsonResponse(model_to_dict(pharmacien))
    except Pharmacien.DoesNotExist:
        return JsonResponse({'error': 'Pharmacien not found'}, status=404)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def pharmacien_destroy(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        pharmacien = Pharmacien.objects.get(pk=id)
        pharmacien.delete()
        return JsonResponse({'message': 'Pharmacien deleted'}, status=200)
    except Pharmacien.DoesNotExist:
        return JsonResponse({'error': 'Pharmacien not found'}, status=404)

@csrf_exempt
# display radiologue list 
@require_http_methods(["GET", "POST"])
def radiologue_list(request):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    radiologues = list(Radiologue.objects.all())
    radiologue_dicts = [model_to_dict(radiologue) for radiologue in radiologues]
    return JsonResponse(radiologue_dicts, safe=False)

@csrf_exempt
# display radiologue details with his id
@require_http_methods(["GET", "POST"])
def radiologue_detail(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        radiologue = Radiologue.objects.get(pk=id)
        return JsonResponse(model_to_dict(radiologue))
    except Radiologue.DoesNotExist:
        return JsonResponse({'error': 'Radiologue not found'}, status=404)

@csrf_exempt
# delete radiologue
@require_http_methods(["GET", "POST"])
def radiologue_destroy(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        radiologue = Radiologue.objects.get(pk=id)
        radiologue.delete()
        return JsonResponse({'message': 'Radiologue deleted'}, status=200)
    except Radiologue.DoesNotExist:
        return JsonResponse({'error': 'Radiologue not found'}, status=404)
# Creat cosultation 
@csrf_exempt
def create_consultation(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            motif = data.get('motif')
            date = data.get('date')
            resume = data.get('resume')
            dossier_id = data.get('dossier_id')
            medecin_id = data.get('medecin_id')

            if not motif or not date or not resume or not dossier_id or not medecin_id:
                return JsonResponse({'error': 'All fields are required'}, status=400)

            consultation = Consultation.objects.create(
                motif=motif,
                date=date,
                resume=resume,
                dossier_id=dossier_id,
                medecin_id=medecin_id
            )

            return JsonResponse({
                'message': 'Consultation created successfully',
                'consultation': {
                    'id': consultation.id,
                    'motif': consultation.motif,
                    'date': consultation.date,
                    'resume': consultation.resume,
                    'dossier_id': consultation.dossier_id,
                    'medecin_id': consultation.medecin_id
                }
            }, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def radiologue_list_examens(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        radiologue = Radiologue.objects.get(pk=id)
        examens = radiologue.examens.all()
        examen_dicts = [model_to_dict(examen) for examen in examens]
        return JsonResponse(examen_dicts, safe=False)
    except Radiologue.DoesNotExist:
        return JsonResponse({'error': 'Radiologue not found'}, status=404)


@csrf_exempt
def validate_ordonnance(request, ordonnance_id):
    try:
        # Get the ordonnance by ID
        ordonnance = Ordonnance.objects.get(id=ordonnance_id)

        # Update the 'validated' field to True
        ordonnance.validated = True
        ordonnance.save()  # Ensure changes are saved

        return JsonResponse({'message': 'Ordonnance validated successfully'}, status=200)

    except Ordonnance.DoesNotExist:
        return JsonResponse({'error': 'Ordonnance not found'}, status=404)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
@csrf_exempt
def create_ordonnance(request, consultation_id):
    if request.method == 'POST':
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body)
            date = data.get('date')
            logger.debug(f"Received data: {data}")
           
            medicaments_data = data.get('medicaments')  # List of medicament details
            logger.debug(f"Medicaments data: {medicaments_data}")

            # Validate medicament data
            if not medicaments_data or not isinstance(medicaments_data, list):
                return JsonResponse({'error': 'No medicaments provided or invalid format'}, status=400)

            # Create the ordonnance object
            ordonnance = Ordonnance.objects.create(
                consultation_id=consultation_id,  # Use the passed consultation ID
                date=date,
                duree='',
                validated=False  # Default to False
            )

            # Create the medicaments and associate them with the ordonnance
            for medicament_data in medicaments_data:
                medicament_nom = medicament_data.get('nom')
                medicament_dosage = medicament_data.get('dosage')
                medicament_voie_administration = medicament_data.get('voie_administration')

                if not medicament_nom or not medicament_dosage or not medicament_voie_administration:
                    return JsonResponse({'error': 'Medicament fields are missing'}, status=400)

                # Create the medicament object
                medicament = Medicament.objects.create(
                    nom=medicament_nom,
                    dosage=medicament_dosage,
                    voie_administration=medicament_voie_administration
                )

                # Create the OrdonnanceMedicament relation
                OrdonnanceMedicament.objects.create(
                    ordonnance_id=ordonnance.id,  # Link the ordonnance by its ID
                    medicament_id=medicament.id  # Link the medicament by its ID
                )

            # Manually validate the ordonnance by updating the validated field
            ordonnance.validated = True
            ordonnance.save()  # Save the changes

            return JsonResponse({'message': 'Ordonnance and Medicaments created successfully and validated'}, status=201)

        except Exception as e:
            return JsonResponse({'erroooooor': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
@csrf_exempt
@require_http_methods(["GET", "POST"])
def ordonance_list(request):
    
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    ordonnances = list(Ordonnance.objects.all())
    ordonnance_dicts = [model_to_dict(ord) for ordonnance in ordonnances]
    return JsonResponse(ordonnance_dicts, safe=False)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def ordonnance_detail(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        ordonnance = Ordonnance.objects.get(pk=id)
        return JsonResponse(model_to_dict(ordonnance))
    except Ordonnance.DoesNotExist:
        return JsonResponse({'error': 'Ordonnance not found'}, status=404)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def ordonnance_destroy(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        ordonnance = Ordonnance.objects.get(pk=id)
        ordonnance.delete()
        return JsonResponse({'message': 'Ordonnance deleted'}, status=200)
    except Ordonnance.DoesNotExist:
        return JsonResponse({'error': 'Ordonnance not found'}, status=404)


@csrf_exempt
@require_http_methods(["GET", "POST"])
def examen_list(request):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    examens = list(Examen.objects.all())
    examen_dicts = [model_to_dict(examen) for examen in examens]
    return JsonResponse(examen_dicts, safe=False)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def examen_detail(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        examen = Examen.objects.get(pk=id)
        return JsonResponse(model_to_dict(examen))
    except Examen.DoesNotExist:
        return JsonResponse({'error': 'Examen not found'}, status=404)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def examen_destroy(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        examen = Examen.objects.get(pk=id)
        examen.delete()
        return JsonResponse({'message': 'Examen deleted'}, status=200)
    except Examen.DoesNotExist:
        return JsonResponse({'error': 'Examen not found'}, status=404)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def laborantin_list(request):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    laborantins = list(Laborantin.objects.all())
    laborantin_dicts = [model_to_dict(laborantin) for laborantin in laborantins]
    return JsonResponse(laborantin_dicts, safe=False)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def laborantin_detail(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        laborantin = Laborantin.objects.get(pk=id)
        return JsonResponse(model_to_dict(laborantin))
    except Laborantin.DoesNotExist:
        return JsonResponse({'error': 'Laborantin not found'}, status=404)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def laborantin_destroy(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        laborantin = Laborantin.objects.get(pk=id)
        laborantin.delete()
        return JsonResponse({'message': 'Laborantin deleted'}, status=200)
    except Laborantin.DoesNotExist:
        return JsonResponse({'error': 'Laborantin not found'}, status=404)


@csrf_exempt
@require_http_methods(["GET", "POST"])
def infirmier_list(request):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    infirmiers = list(Infirmier.objects.all())
    infirmier_dicts = [model_to_dict(infirmier) for infirmier in infirmiers]
    return JsonResponse(infirmier_dicts, safe=False)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def infirmier_detail(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        infirmier = Infirmier.objects.get(pk=id)
        return JsonResponse(model_to_dict(infirmier))
    except Infirmier.DoesNotExist:
        return JsonResponse({'error': 'Infirmier not found'}, status=404)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def infirmier_destroy(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        infirmier = Infirmier.objects.get(pk=id)
        infirmier.delete()
        return JsonResponse({'message': 'Infirmier deleted'}, status=200)
    except Infirmier.DoesNotExist:
        return JsonResponse({'error': 'Infirmier not found'}, status=404)


class SearchPatientView(APIView):
    def get(self, request, nss):
        try:
            patient = Patient.objects.get(nss=nss)
            serializer = PatientSerializer(patient)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Patient.DoesNotExist:
            return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
def Admin(request):
 
    if request.method == "POST":
        try:
            # Parse JSON data from request body
            data = json.loads(request.body)
            role = data.get('role')

            # Handle 'patient' role
            if role == 'patient':
                num_securite_sociale = data.get('num_securite_sociale')
                nom = data.get('nom')
                prenom = data.get('prenom')
                date_naissance = data.get('date_naissance')
                adress = data.get('adress')
                telephone = data.get('telephone')
                email = data.get('email')
                password = data.get('password')
                medecin_id = data.get("medecin_traitant")
                medecin_traitant = Medecin.objects.get(id=medecin_id)
                personne_contact = data.get('personne_contact')
                dossier_patient = DossierPatient.objects.create(
                date_creation=datetime.today().date(),
                num_securite_sociale=num_securite_sociale
            )                
                # Create a new Patient instance
                user = User.objects.create_user(username=email, password=password, email=email)
                Patient.objects.create(
                    user=user,
                    num_securite_sociale=num_securite_sociale,
                    nom=nom,
                    prenom=prenom,
                    date_naissance=date_naissance,
                    adress=adress,
                    telephone=telephone,
                    medecin_traitant=medecin_traitant,
                    personne_contact=personne_contact
                )
                return JsonResponse({'status': 'success', 'role': 'patient'})

            # Handle 'medecin' role
            elif role == 'medecin':
                nom = data.get('nom')
                prenom = data.get('prenom')
                email = data.get('email')
                password = data.get('password')

                # Create a new Medecin instance
                user = User.objects.create_user(username=email, password=password, email=email)
                Medecin.objects.create(
                    user=user,
                    nom=nom,
                    prenom=prenom,
                    email=email,
                )
                return JsonResponse({'status': 'success', 'role': 'medecin'})

            # Handle other roles similarly
            elif role == 'infirmier':
                # Add your logic here
                pass
            elif role == 'laborantin':
                # Add your logic here
                pass
            elif role == 'radiologue':
                # Add your logic here
                pass

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format'}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)


def home(request):
    return render(request, 'home.html')

def success(request):
    return render(request, 'create_patient.html')

def medecin(request):
    return render(request, "medecin.html")



@csrf_exempt  
def infirmier(request):
    if request.method == "POST":
        try:
           
            data = json.loads(request.body)
            type = data.get('type')
            date = data.get('date')
            description = data.get('description')
            observation = data.get('observation')
            nss = data.get('nss')

          
            if not all([type, date, description, observation, nss]):
                return JsonResponse({'status': 'error', 'message': 'Missing fields in request'}, status=400)

            
            dossier = get_object_or_404(DossierPatient, num_securite_sociale=nss)

            
            Soin.objects.create(
                date=date,
                type=type,
                description=description,
                observation=observation,
                infirmier_id=request.user.infirmier.id, 
                dossier_id=dossier.id,
            )

            return JsonResponse({'status': 'success', 'message': 'Soin created successfully'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format'}, status=400)
        except DossierPatient.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Patient dossier not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

class CreateConsultationView(CreateAPIView):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer

class AddOrdonnanceView(CreateAPIView):
    queryset = Ordonnance.objects.all()
    serializer_class =  OrdonnanceSerializer

class RequestExamenRadiologiqueView(CreateAPIView):
    queryset = ExamenRadiologique.objects.all()
    serializer_class = ExamenSerializer

class RequestExamenBiologiqueView(CreateAPIView):
    queryset = ExamenBiologique.objects.all()
    serializer_class = ExamenSerializer
class UpdateConsultationView(UpdateAPIView):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer

class ListConsultationView(ListAPIView):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer

class ListOrdonnanceView(ListAPIView):
    queryset = Ordonnance.objects.all()
    serializer_class = OrdonnanceSerializer

class ListExamenRadiologiqueView(ListAPIView):
    queryset = ExamenRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer

class ListExamenBiologiqueView(ListAPIView):
    queryset = ExamenBiologique.objects.all()
    serializer_class = ExamenBiologiqueSerializer

class DeleteOrdonnanceView(DestroyAPIView):
    queryset = Ordonnance.objects.all()
    serializer_class = OrdonnanceSerializer

class DeleteExamenRadiologiqueView(DestroyAPIView):
    queryset = ExamenRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer

class DeleteExamenBiologiqueView(DestroyAPIView):
    queryset = ExamenBiologique.objects.all()
    serializer_class = ExamenBiologiqueSerializer

class DeleteConsultationView(DestroyAPIView):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer


class ListExamenRadiologiqueView(ListAPIView):
    queryset = ExamenRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer

class CreateExamenRadiologiqueView(CreateAPIView):
    queryset = ExamenRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer

class UpdateExamenRadiologiqueView(UpdateAPIView):
    queryset = ExamenRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer

class DeleteExamenRadiologiqueView(DestroyAPIView):
    queryset = ExamenRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer


class ListExamenBiologiqueView(ListAPIView):
    queryset = ExamenBiologique.objects.all()
    serializer_class = ExamenBiologiqueSerializer

class CreateExamenBiologiqueView(CreateAPIView):
    queryset = ExamenBiologique.objects.all()
    serializer_class = ExamenBiologiqueSerializer

class UpdateExamenBiologiqueView(UpdateAPIView):
    queryset = ExamenBiologique.objects.all()
    serializer_class = ExamenBiologiqueSerializer

class DeleteExamenBiologiqueView(DestroyAPIView):
    queryset = ExamenBiologique.objects.all()
    serializer_class = ExamenBiologiqueSerializer

class ListInfirmierView(ListAPIView):
    queryset = Infirmier.objects.all()
    serializer_class = InfirmierSerializer

class CreateInfirmierView(CreateAPIView):
    queryset = Infirmier.objects.all()
    serializer_class = InfirmierSerializer

class UpdateInfirmierView(UpdateAPIView):
    queryset = Infirmier.objects.all()
    serializer_class = InfirmierSerializer

class DeleteInfirmierView(DestroyAPIView):
    queryset = Infirmier.objects.all()
    serializer_class = InfirmierSerializer


class ListPharmacienView(ListAPIView):
    queryset = Pharmacien.objects.all()
    serializer_class = PharmacienSerializer

class CreatePharmacienView(CreateAPIView):
    queryset = Pharmacien.objects.all()
    serializer_class = PharmacienSerializer

class UpdatePharmacienView(UpdateAPIView):
    queryset = Pharmacien.objects.all()
    serializer_class = PharmacienSerializer

class DeletePharmacienView(DestroyAPIView):
    queryset = Pharmacien.objects.all()
    serializer_class = PharmacienSerializer


class ListRadiologueView(ListAPIView):
    queryset = Radiologue.objects.all()
    serializer_class = RadiologueSerializer

class CreateRadiologueView(CreateAPIView):
    queryset = Radiologue.objects.all()
    serializer_class = RadiologueSerializer

class UpdateRadiologueView(UpdateAPIView):
    queryset = Radiologue.objects.all()
    serializer_class = RadiologueSerializer

class DeleteRadiologueView(DestroyAPIView):
    queryset = Radiologue.objects.all()
    serializer_class = RadiologueSerializer

class ListAntecedentView(ListAPIView):
    queryset = Antecedent.objects.all()
    serializer_class = AntecedentSerializer

class CreateAntecedentView(CreateAPIView):
    queryset = Antecedent.objects.all()
    serializer_class = AntecedentSerializer

class UpdateAntecedentView(UpdateAPIView):
    queryset = Antecedent.objects.all()
    serializer_class = AntecedentSerializer

class DeleteAntecedentView(DestroyAPIView):
    queryset = Antecedent.objects.all()
    serializer_class = AntecedentSerializer

class ListDossierPatientView(ListAPIView):
    queryset = DossierPatient.objects.all()
    serializer_class = DossierPatientSerializer

class CreateDossierPatientView(CreateAPIView):
    queryset = DossierPatient.objects.all()
    serializer_class = DossierPatientSerializer

class UpdateDossierPatientView(UpdateAPIView):
    queryset = DossierPatient.objects.all()
    serializer_class = DossierPatientSerializer

class DeleteDossierPatientView(DestroyAPIView):
    queryset = DossierPatient.objects.all()
    serializer_class = DossierPatientSerializer


class ListCompteRenduView(ListAPIView):
    queryset = CompteRendu.objects.all()
    serializer_class = CompteRenduSerializer

class CreateCompteRenduView(CreateAPIView):
    queryset = CompteRendu.objects.all()
    serializer_class = CompteRenduSerializer

class UpdateCompteRenduView(UpdateAPIView):
    queryset = CompteRendu.objects.all()
    serializer_class = CompteRenduSerializer

class DeleteCompteRenduView(DestroyAPIView):
    queryset = CompteRendu.objects.all()
    serializer_class = CompteRenduSerializer


class ListMedicamentView(ListAPIView):
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer

class CreateMedicamentView(CreateAPIView):
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer

class UpdateMedicamentView(UpdateAPIView):
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer

class DeleteMedicamentView(DestroyAPIView):
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer


class ListOrdonnanceMedicamentView(ListAPIView):
    queryset = OrdonnanceMedicament.objects.all()
    serializer_class = OrdonnanceMedicamentSerializer

class CreateOrdonnanceMedicamentView(CreateAPIView):
    queryset = OrdonnanceMedicament.objects.all()
    serializer_class = OrdonnanceMedicamentSerializer

class UpdateOrdonnanceMedicamentView(UpdateAPIView):
    queryset = OrdonnanceMedicament.objects.all()
    serializer_class = OrdonnanceMedicamentSerializer

class DeleteOrdonnanceMedicamentView(DestroyAPIView):
    queryset = OrdonnanceMedicament.objects.all()
    serializer_class = OrdonnanceMedicamentSerializer


class ListCertificatMedicalView(ListAPIView):
    queryset = CertificatMedical.objects.all()
    serializer_class = CertificatMedicalSerializer

class CreateCertificatMedicalView(CreateAPIView):
    queryset = CertificatMedical.objects.all()
    serializer_class = CertificatMedicalSerializer

class UpdateCertificatMedicalView(UpdateAPIView):
    queryset = CertificatMedical.objects.all()
    serializer_class = CertificatMedicalSerializer

class DeleteCertificatMedicalView(DestroyAPIView):
    queryset = CertificatMedical.objects.all()
    serializer_class = CertificatMedicalSerializer


class ListSoinView(ListAPIView):
    queryset = Soin.objects.all()
    serializer_class = SoinSerializer

class CreateSoinView(CreateAPIView):
    queryset = Soin.objects.all()
    serializer_class = SoinSerializer

class UpdateSoinView(UpdateAPIView):
    queryset = Soin.objects.all()
    serializer_class = SoinSerializer

class DeleteSoinView(DestroyAPIView):
    queryset = Soin.objects.all()
    serializer_class = SoinSerializer

class CompteRenduDetailView(RetrieveAPIView):
    serializer_class = CompteRenduSerializer
    queryset = CompteRendu.objects.all()

class MedicamentDetailView(RetrieveAPIView):
    serializer_class = MedicamentSerializer
    queryset = Medicament.objects.all()

class OrdonnanceMedicamentDetailView(RetrieveAPIView):
    serializer_class = OrdonnanceMedicamentSerializer
    queryset = OrdonnanceMedicament.objects.all()

class CertificatMedicalDetailView(RetrieveAPIView):
    serializer_class = CertificatMedicalSerializer
    queryset = CertificatMedical.objects.all()

class SoinDetailView(RetrieveAPIView):
    serializer_class = SoinSerializer
    queryset = Soin.objects.all()

class MedecinPatientList(ListAPIView):
    serializer_class = PatientSerializer

    def get_queryset(self):
        """
        This view should return a list of all patients
        ford the currently authenticated user.
        """
        user = self.request.user
        return Patient.objects.filter(medecin=user)
    
class MedecinPatientDetail(RetrieveAPIView):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()

class PatientDetailView(RetrieveAPIView):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()

class ExamenRadiologiqueDetailView(RetrieveAPIView):
    serializer_class = ExamenRadiologiqueSerializer
    queryset = ExamenRadiologique.objects.all()

class ExamenBiologiqueDetailView(RetrieveAPIView):
    serializer_class = ExamenBiologiqueSerializer
    queryset = ExamenBiologique.objects.all()


class OrdonnanceListView(ListAPIView):
    serializer_class = OrdonnanceSerializer

    def get_queryset(self):
        """
        This view should return a list of all ordonnances
        for the currently authenticated user.
        """
        user = self.request.user
        return Ordonnance.objects.filter(medecin=user)

class OrdonnanceDetailView(RetrieveAPIView):
    serializer_class = OrdonnanceSerializer
    queryset = Ordonnance.objects.all()

class OrdonnanceDeleteView(DestroyAPIView):
    serializer_class = OrdonnanceSerializer
    queryset = Ordonnance.objects.all()

from rest_framework import serializers
from rest_framework.generics import ListAPIView
from .models import Consultation, User
from .serializers import ConsultationSerializer

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['id', 'motif', 'date', 'resume', 'dossier_id', 'medecin_id']

from rest_framework.generics import ListAPIView
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404

@csrf_exempt
def ConsultationListView(request, pk):
    if request.method == 'GET':
                # Fetch the Medecin object that has a user_id equal to pk
        medecin = get_object_or_404(Medecin, user__id=pk)  # Look for Medecin with user_id = pk
        
        # Filter consultations by medecin_id
        consultations = Consultation.objects.filter(medecin_id=medecin.id)


        print({medecin})
        # Filter consultations by medecin_id (using the pk passed in the URL)
        consultations = Consultation.objects.filter(medecin_id=medecin.id)

        if not consultations:
            # Return a JSON response indicating no consultations found
            return JsonResponse({"error": "No consultations found for this doctor."}, status=404)

        # Prepare the data to be returned in JSON format
        consultations_data = []
        for consultation in consultations:
            consultations_data.append({
                "motif": consultation.motif,
                "date": consultation.date,
                "resume": consultation.resume,
                "dossier_id": consultation.dossier_id,
                "medecin_id": consultation.medecin_id,
            })

        # Return the data as JSON
        return JsonResponse({"consultations": consultations_data})

    else:
        # If the request method is not GET, return a 405 Method Not Allowed
        return JsonResponse({"error": "Method not allowed. Only GET requests are allowed."}, status=405)

    
class UpdateOrdonnanceView(UpdateAPIView):
    queryset = Ordonnance.objects.all()
    serializer_class = OrdonnanceSerializer

class MedicalExamListView(ListAPIView):
    serializer_class = ExamenSerializer

    def get_queryset(self):
        """
        This view should return a list of all medical exams
        for the currently authenticated user.
        """
        user = self.request.user
        return Examen.objects.filter(medecin=user)
class UpdateExamenRadiologiqueView(UpdateAPIView):
    queryset = ExamenRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer

    def get_queryset(self):
        """
        This view should return a list of all medical exams
        for the currently authenticated user's consultation.
        """
        user = self.request.user
        return ExamenRadiologique.objects.filter(consultation__medecin=user)

class UpdateExamenBiologiqueView(UpdateAPIView):
    queryset = ExamenBiologique.objects.all()
    serializer_class = ExamenBiologiqueSerializer

    def get_queryset(self):
        """
        This view should return a list of all medical exams
        for the currently authenticated user's consultation.
        """
        user = self.request.user
        return ExamenBiologique.objects.filter(consultation__medecin=user)
    
class ExamenRadiologiqueListView(ListAPIView):
    serializer_class = ExamenRadiologiqueSerializer

    def get_queryset(self):
        """
        This view should return a list of all radiological exams
        for the currently authenticated user.
        """
        user = self.request.user
        return ExamenRadiologique.objects.filter(radiologue=user)
class ExamenBiologiqueListView(ListAPIView):
    serializer_class = ExamenBiologiqueSerializer

    def get_queryset(self):
        """
        This view should return a list of all biological exams
        for the currently authenticated user.
        """
        user = self.request.user
        return ExamenBiologique.objects.filter(laborantin=user)

class CompteRenduListView(ListAPIView):
    serializer_class = CompteRenduSerializer

    def get_queryset(self):
        """
        This view should return a list of all compte rendus
        for the currently authenticated user.
        """
        user = self.request.user
        return CompteRendu.objects.filter(auteur=user)
class MedicamentListView(ListAPIView):
    serializer_class = MedicamentSerializer
    queryset = Medicament.objects.all()

class OrdonnanceMedicamentListView(ListAPIView):
    serializer_class = OrdonnanceMedicamentSerializer

    def get_queryset(self):
        """
        This view should return a list of all ordonnances medicaments
        for the currently authenticated user.
        """
        user = self.request.user
        return OrdonnanceMedicament.objects.filter(ordonnance__medecin=user)

class CertificatMedicalListView(ListAPIView):
    serializer_class = CertificatMedicalSerializer

    def get_queryset(self):
        """
        This view should return a list of all certificats medicaux
        for the currently authenticated user.
        """
        user = self.request.user
        return CertificatMedical.objects.filter(dossier__patient=user)

class SoinListView(ListAPIView):
    serializer_class = SoinSerializer

    def get_queryset(self):
        """
        This view should return a list of all soins
        for the currently authenticated user.
        """
        user = self.request.user
        return Soin.objects.filter(infirmier=user)
    
@csrf_exempt
def get_patient(request, id):
    if request.method == 'GET':
        try:
            # Ensure the ID is provided
            if not id:
                return JsonResponse(
                    {"error": "ID parameter is required."},
                    status=400
                )
            
            # Retrieve the DossierPatient by ID
            dossier_patient = DossierPatient.objects.get(id=id)
            
            # Retrieve the Patient by matching num_securite_sociale
            patient = Patient.objects.get(num_securite_sociale=dossier_patient.num_securite_sociale)
            
            # Serialize the Patient data
            serializer = PatientSerializer(patient)
            
            # Return the serialized data as JSON
            return JsonResponse(serializer.data, status=200)
        
        except DossierPatient.DoesNotExist:
            return JsonResponse(
                {"error": f"No DossierPatient found with ID {id}."},
                status=404
            )
        
        except Patient.DoesNotExist:
            return JsonResponse(
                {"error": f"No Patient found for DossierPatient ID {id}."},
                status=404
            )
        
        except Exception as e:
            return JsonResponse(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=500
            )
    
    # If the request method is not GET, return a 405 Method Not Allowed response
    return JsonResponse(
        {"error": "Method not allowed. Please use GET."},
        status=405
    )  
@csrf_exempt
def get_patient_name(request, id):
    if request.method == 'GET':
        try:
            # Ensure the ID is provided
            if not id:
                return JsonResponse(
                    {"error": "ID parameter is required."},
                    status=400
                )
            
            # Retrieve the DossierPatient by ID
            dossier_patient = DossierPatient.objects.get(id=id)
            
            # Retrieve the Patient by matching num_securite_sociale
            patient = Patient.objects.get(num_securite_sociale=dossier_patient.num_securite_sociale)
            
            # Serialize the Patient data
            serializer = PatientSerializer(patient.nom)
            
            # Return the serialized data as JSON
            return JsonResponse(serializer.data, status=200)
        
        except DossierPatient.DoesNotExist:
            return JsonResponse(
                {"error": f"No DossierPatient found with ID {id}."},
                status=404
            )
        
        except Patient.DoesNotExist:
            return JsonResponse(
                {"error": f"No Patient found for DossierPatient ID {id}."},
                status=404
            )
        
        except Exception as e:
            return JsonResponse(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=500
            )
    
    # If the request method is not GET, return a 405 Method Not Allowed response
    return JsonResponse(
        {"error": "Method not allowed. Please use GET."},
        status=405
    )  


@csrf_exempt
def medecin_patients(request):
    try:
        # Check if the user is authenticated
        if request.user.is_authenticated and not isinstance(request.user):
            # Retrieve the Medecin associated with the currently logged-in user
            medecin = Medecin.objects.get(user=request.user)
        else:
            # Default to Medecin with ID 5 if no user is connected
            medecin = Medecin.objects.get(id=5)

        # Retrieve all patients associated with this Medecin
        patients = Patient.objects.filter(medecin_traitant=medecin)

        # Serialize the data into a list of dictionaries
        patients_list = [
            {
                "id": patient.id,
                "nom": patient.nom,
                "prenom": patient.prenom,
                "email": patient.user.email,  # Assuming email is stored in the User model
                "num_securite_sociale": patient.num_securite_sociale,
                "date_naissance": patient.date_naissance,
                "adress": patient.adress,
                "telephone": patient.telephone,
                "personne_contact": patient.personne_contact
            }
            for patient in patients
        ]

        # Return the serialized data as JSON, only with patients
        return JsonResponse({"patients": patients_list}, status=200)

    except Medecin.DoesNotExist:
        return JsonResponse({"error": "Medecin not found."}, status=404)

    except Exception as e:
        return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
@csrf_exempt
def authentification(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get('nss')
        password = data.get('password')
        role = data.get('role')
        user = None
        if role == 'patient':
            try:
                user = Patient.objects.get(num_securite_sociale=username).user
            except Patient.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})
        elif role == 'medecin':
            try:
                user = Medecin.objects.get(email=username).user
            except Medecin.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})
        elif role == 'infirmier':
            try:
                user = Infirmier.objects.get(num_securite_sociale=username).user
            except Infirmier.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})
        elif role == 'laborantin':
            try:
                user = Laborantin.objects.get(num_securite_sociale=username).user
            except Laborantin.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})
        elif role == 'radiologue':
            try:
                user = Radiologue.objects.get(num_securite_sociale=username).user
            except Radiologue.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})

        if user is not None and user.check_password(password):
            # User is valid, generate JWT token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            user_serializer = UserSerializer(user)
            return JsonResponse({
                'status': 'success',
                'user': user_serializer.data,
                'role':role,
                'access_token': access_token
            })
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
        
        # Extract user information from request
        username = data.get('username')
        password = data.get('password')
        role = data.get('role')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        
        # Ensure all required fields are present
        if not username or not password or not role:
            return JsonResponse({'status': 'error', 'message': 'Username, password, and role are required.'})
        
        # Create User object
        try:
            user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})

        # Create role-specific model instance
        if role == 'patient':
            num_securite_sociale = data.get('num_securite_sociale')
            nom = data.get('nom')
            prenom = data.get('prenom')
            date_naissance = data.get('date_naissance')
            adress = data.get('adress')
            telephone = data.get('telephone')
            medecin_traitant_id = data.get('medecin_traitant')  # This should be a Medecin ID
            
            if not num_securite_sociale or not nom or not prenom or not date_naissance or not adress or not telephone or not medecin_traitant_id:
                return JsonResponse({'status': 'error', 'message': 'All patient details are required.'})
            
            medecin_traitant = Medecin.objects.get(id=medecin_traitant_id)
            patient = Patient.objects.create(
                user=user,
                num_securite_sociale=num_securite_sociale,
                nom=nom,
                prenom=prenom,
                date_naissance=date_naissance,
                adress=adress,
                telephone=telephone,
                medecin_traitant=medecin_traitant,
                personne_contact=data.get('personne_contact')
            )
            return JsonResponse({'status': 'success', 'message': 'Patient account created successfully.'})

        elif role == 'medecin':
            nom = data.get('nom')
            prenom = data.get('prenom')
            email = data.get('email')
            
            if not nom or not prenom or not email:
                return JsonResponse({'status': 'error', 'message': 'Medecin details are required.'})
            
            medecin = Medecin.objects.create(user=user, nom=nom, prenom=prenom, email=email)
            return JsonResponse({'status': 'success', 'message': 'Medecin account created successfully.'})

        elif role == 'infirmier':
            nom = data.get('nom')
            prenom = data.get('prenom')
            email = data.get('email')
            
            if not nom or not prenom or not email:
                return JsonResponse({'status': 'error', 'message': 'Infirmier details are required.'})
            
            infirmier = Infirmier.objects.create(user=user, nom=nom, prenom=prenom, email=email)
            return JsonResponse({'status': 'success', 'message': 'Infirmier account created successfully.'})

        elif role == 'laborantin':
            nom = data.get('nom')
            prenom = data.get('prenom')
            email = data.get('email')
            
            if not nom or not prenom or not email:
                return JsonResponse({'status': 'error', 'message': 'Laborantin details are required.'})
            
            laborantin = Laborantin.objects.create(user=user, nom=nom, prenom=prenom, email=email)
            return JsonResponse({'status': 'success', 'message': 'Laborantin account created successfully.'})

        elif role == 'radiologue':
            nom = data.get('nom')
            prenom = data.get('prenom')
            email = data.get('email')
            
            if not nom or not prenom or not email:
                return JsonResponse({'status': 'error', 'message': 'Radiologue details are required.'})
            
            radiologue = Radiologue.objects.create(user=user, nom=nom, prenom=prenom, email=email)
            return JsonResponse({'status': 'success', 'message': 'Radiologue account created successfully.'})

        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid role.'})

        # Create token for authentication
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return JsonResponse({'status': 'success', 'message': 'User created successfully.', 'access_token': access_token})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method. Use POST.'})

@csrf_exempt
def search_dossier_patient_by_id(request, patient_id):
    try:
        patient = Patient.objects.get(id=patient_id)
        dossier = DossierPatient.objects.get(num_securite_sociale=patient.num_securite_sociale)
        return JsonResponse({"dossier_patient": {"id": dossier.id, "date_creation": dossier.date_creation}})
    except Patient.DoesNotExist:
        return JsonResponse({"error": "Patient not found"}, status=404)
    except DossierPatient.DoesNotExist:
        return JsonResponse({"error": "Dossier not found"}, status=404)

@csrf_exempt
def consultations_by_patient(request, dossier_id):
    try:
        # Obtenir toutes les consultations du patient
        consultations = Consultation.objects.filter(dossier_id=dossier_id)

        # Transformer les objets Consultation en dictionnaires
        consultations_list = list(consultations.values("id", "motif", "date", "resume", "dossier_id", "medecin_id"))

        return JsonResponse({"status": "success", "consultations": consultations_list}, safe=False)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

@csrf_exempt
def create_consultation(request, dossier_id):
    try:
        if request.method == "POST":
            # Log the received data
            print("Received data:", request.body)
            data = json.loads(request.body)
            
            # Log parsed data
            print("Parsed data:", data)
            
            user_id = data.get('userId')
            motif = data.get('motif')
            resume = data.get('resume')
            date = data.get('date')
            
            # Log extracted values
            print(f"user_id: {user_id}, motif: {motif}, resume: {resume}, date: {date}")

            if not all([user_id, motif, resume]):
                return JsonResponse({
                    "status": "error", 
                    "message": "Missing required fields",
                    "received": {"user_id": user_id, "motif": motif, "resume": resume}
                }, status=400)

            try:
                medecin = Medecin.objects.get(user_id=user_id)
                medecin_id = medecin.id
            except Medecin.DoesNotExist:
                print(f"No Medecin found for user_id: {user_id}")
                medecin_id = 5

            consultation = Consultation.objects.create(
                motif=motif,
                date=date,
                resume=resume,
                dossier_id=dossier_id,
                medecin_id=medecin_id
            )

            return JsonResponse({
            "id": consultation.id,
            "message": "Consultation created successfully."
        })

    except json.JSONDecodeError as e:
        print("JSON Decode Error:", str(e))
        return JsonResponse({
            "status": "error",
            "message": "Invalid JSON data",
            "detail": str(e)
        }, status=400)
    except Exception as e:
        print("Unexpected error:", str(e))
        return JsonResponse({
            "status": "error",
            "message": "An unexpected error occurred",
            "detail": str(e)
        }, status=500)
@csrf_exempt
def create_antecedent(request, dossier_id):
    if request.method == 'POST':
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body)
            antecedent_type = data.get('type')
            description = data.get('description')
            date_declaration = data.get('date_declaration')

            # Validate the required fields
            if not antecedent_type or not description or not date_declaration:
                return JsonResponse({'error': 'Missing required fields'}, status=400)

            # Create the Antecedent object
            antecedent = Antecedent.objects.create(
                type=antecedent_type,
                description=description,
                date_declaration=date_declaration,
                dossier_id=dossier_id  # Use the provided dossier_id
            )

            return JsonResponse({'message': 'Antecedent created successfully', 'id': antecedent.id}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)