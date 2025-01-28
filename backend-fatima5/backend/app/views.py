from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import *
from django.shortcuts import redirect
from django.shortcuts import get_list_or_404, render, redirect
from django.http import JsonResponse
from .models import *
from django.utils.dateparse import parse_date
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import *
import json
from datetime import datetime
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
import qrcode
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile

def generate_patient_qr_code(patient_data):
    # Create the QR code
    qr = qrcode.make(patient_data)
    
    # Save it in a BytesIO object
    img_io = BytesIO()
    qr.save(img_io, 'PNG')
    img_io.seek(0)
    
    # Return the file as an InMemoryUploadedFile (so it can be saved directly in the model)
    return InMemoryUploadedFile(img_io, None, 'patient_qr.png', 'image/png', img_io.getbuffer().nbytes, None)

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
def consultations_by_patient(request, dossier_id):
    try:
        # Obtenir toutes les consultations du patient
        consultations = Consultation.objects.filter(dossier_id=dossier_id)
        
        # Transformer les objets Consultation en dictionnaires
        consultations_list = list(consultations.values("id", "motif", "date", "resume", "dossier_id", "medecin_id"))
        print(f"Consultations après transformation: {consultations_list}")
        return JsonResponse({"status": "success", "consultations": consultations_list}, safe=False)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)


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
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
       

# Get current date
        current_date = datetime.now()

# Format date as YYYY-MM-DD
        formatted_date = current_date.strftime("%Y-%m-%d")

# Outputs: e.g., "2025-01-04"
        # Extract user information from request
        username = data.get('username')
        password = data.get('password')
        role = data.get('role')
        first_name = data.get('prenom')
        last_name = data.get('nom')
        email = data.get('email')
        
        # Ensure all required fields are present
        if not username or not password or not role:
            return JsonResponse({'status': 'error', 'message': 'Username, password, and role are required.'})
        
        # Create User object
        try:
            user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
        print("here")
        # Create role-specific model instance
        if role == 'patient':
            print("renato veiga")
            num_securite_sociale = data.get('num_securite_sociale')
            nom = data.get('nom')
            prenom = data.get('prenom')
            date_naissance = data.get('date_naissance')
            adress = data.get('adress')
            telephone = data.get('telephone')
            medecin_traitan = data.get("medecin_traitant"); # This should be a Medecin ID
             # You can use patient NSS or any unique ID here
           
            try:
                medecin_traitant = Medecin.objects.get(id=medecin_traitan)
            except Medecin.DoesNotExist:
                 return JsonResponse({'status': 'error', 'message': 'medecin doesnt exist.'})
            
            if not num_securite_sociale or not nom or not prenom or not date_naissance or not adress or not telephone or not medecin_traitant:
                return JsonResponse({'status': 'error', 'message': 'All patient details are required.'})
            
           
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
            
            dpi = DossierPatient.objects.create(
                date_creation = formatted_date,
                num_securite_sociale = num_securite_sociale
            )
            qr_code_image = generate_patient_qr_code(num_securite_sociale) 
            dpi.qr_code.save(f'{num_securite_sociale}_qr.png', qr_code_image, save=True)
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
def get_ordonnances_by_consultation(request):
    if request.method == "POST":
        try:
            # Parse the request body (JSON data)
            data = json.loads(request.body)
            
            # Get the consultation_id from the request data
            consultation_id = data.get('consultation_id')

            if not consultation_id:
                return JsonResponse({"status": "error", "message": "consultation_id is required."}, status=400)
            
            # Get all Ordonnances related to the given consultation_id
            ordonnances = Ordonnance.objects.filter(consultation_id=consultation_id)

            # Prepare the response data
            result = []

            for ordonnance in ordonnances:
                # Get all OrdonnanceMedicament relationships for each Ordonnance
                ordonnance_medicaments = OrdonnanceMedicament.objects.filter(ordonnance_id=ordonnance.id)

                # Prepare list of medicaments for the current ordonnance
                medicaments = []
                for ordonnance_medicament in ordonnance_medicaments:
                    medicament = Medicament.objects.get(id=ordonnance_medicament.medicament_id)
                    medicaments.append({
                        "nom": medicament.nom,
                        "dosage": medicament.dosage,
                        "voie_administration": medicament.voie_administration
                    })

                # Append ordonnance data with its related medicaments
                result.append({
                    "ordonnance_id": ordonnance.id,
                    "date": ordonnance.date,
                    "duree": ordonnance.duree,
                    "validated": ordonnance.validated,
                    "medicaments": medicaments
                })

            # Return the response as JSON
            return JsonResponse({"status": "success", "data": result}, safe=False)

        except Exception as e:
            # Handle errors and return appropriate response
            return JsonResponse({"status": "error", "message": str(e)}, status=400)
    else:
        return JsonResponse({"status": "error", "message": "Only POST method is allowed."}, status=405)
@csrf_exempt
def create_medicament(request):
    if request.method == 'POST':
        # Parse the incoming request data
        data = json.loads(request.body)

        # Extract the fields from the request
        nom = data.get('nom')
        dosage = data.get('dosage')
        voie_administration = data.get('voie_administration')
        ordonnance_id = data.get('ordonnance_id')  # Get the ordonnance ID to link with medicament

        # Ensure all necessary fields are provided
        if not nom or not dosage or not voie_administration or not ordonnance_id:
            return JsonResponse({'status': 'error', 'message': 'Nom, dosage, voie_administration, and ordonnance_id are required.'})

        # Check if the Ordonnance exists
        try:
            ordonnance = Ordonnance.objects.get(id=ordonnance_id)
        except Ordonnance.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Ordonnance with this ID does not exist.'})

        # Create the Medicament
        medicament = Medicament.objects.create(
            nom=nom,
            dosage=dosage,
            voie_administration=voie_administration
        )

        # Create the OrdonnanceMedicament relationship
        ordonnance_medicament = OrdonnanceMedicament.objects.create(
            ordonnance_id=ordonnance_id,
            medicament_id=medicament.id
        )

        # Return a success response
        return JsonResponse({'status': 'success', 'message': 'Medicament created and linked to ordonnance successfully.', 'medicament_id': medicament.id})

    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed.'})

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
@csrf_exempt
def get_dossier_by_nss(request):
    if request.method == 'POST':
        try:
            # Load the request body
            data = json.loads(request.body)

            # Extract NSS from the request body
            nss = data.get('nss')

            # Check if NSS is provided
            if not nss:
                return JsonResponse({'error': 'NSS is required'}, status=400)

            # Find the patient by NSS (assuming NSS is unique)
            dossier = DossierPatient.objects.filter(num_securite_sociale=nss).first()

            # Check if patient is found
            if not dossier:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            # Return the dossier_id (assuming the dossier_id is the NSS)
            return JsonResponse({'dossier_id': dossier.id}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
@csrf_exempt
def get_consultations_by_dossier_id(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method. Only POST is supported.'}, status=405)
    
    try:
        data = json.loads(request.body)
        dossier_id = data.get('dossier_id')

        if not dossier_id:
            return JsonResponse({'error': 'Dossier ID is required.'}, status=400)
        
        consultations = Consultation.objects.filter(dossier_id=dossier_id)
        
        if not consultations.exists():
            return JsonResponse({'error': 'No consultations found for the given dossier ID.'}, status=404)
        
        consultations_data = [
            {
                'id': consultation.id,
                'motif': consultation.motif,
                'date': consultation.date,
                'resume': consultation.resume,
                'medecin_id': consultation.medecin_id,
            }
            for consultation in consultations
        ]
        
        return JsonResponse({'consultations': consultations_data}, status=200)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
# Creat cosultation 
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
    
@csrf_exempt
def create_bilan_biologique(request, consultation_id, dossier_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            observation = data.get('observation', '')
            pression_arterielle = data.get('pression_arterielle', True)
            glycemie = data.get('glycemie', True)
            cholesterol_total = data.get('cholesterol_total', True)

            # Create the BilanBiologique instance
            bilan = BilanBiologique.objects.create(
                consultation_id=consultation_id,
                dossier_id=dossier_id,
                observation=observation,
                pression_arterielle=pression_arterielle,
                glycemie=glycemie,
                cholesterol_total=cholesterol_total
            )
            return JsonResponse({'message': 'Bilan Biologique created successfully', 'id': bilan.id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def create_bilan_radiologique(request, consultation_id, dossier_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            observation = data.get('observation', '')

            # Create the BilanRadiologique instance
            bilan = BilanRadiologique.objects.create(
                consultation_id=consultation_id,
                dossier_id=dossier_id,
                observation=observation
            )
            return JsonResponse({'message': 'Bilan Radiologique created successfully', 'id': bilan.id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
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
            print(f"Received data: {data}")
           
            medicaments_data = data.get('medicaments')  # List of medicament details
            print(f"Medicaments data: {medicaments_data}")

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

def create_examen_biologique(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            interpretations=data.get('interpretation')
            # Extract data
            type = data.get('type')
            date = data.get('date')
            resultat = data.get('resultat')
            consultation_id = data.get('consultation_id')
            parametres = data.get('parametres')
            valeurs = data.get('valeurs')
            graphique_tendance = data.get('graphique_tendance')
            laborantin_id = data.get('laborantin_id')

            if not all([type, date, resultat, consultation_id, parametres, valeurs, graphique_tendance, laborantin_id]):
                return JsonResponse({'error': 'All fields are required'}, status=400)

           
            # Create ExBiologique
            examen_biologique = ExBiologique.objects.create(
                type=type,
                date=date,
                interpretations=interpretations,
                resultat=resultat,
                consultation_id=consultation_id,
                parametres=parametres,
                valeurs=valeurs,
                graphique_tendance=graphique_tendance,
                laborantin_id=laborantin_id
            )

            return JsonResponse({'message': 'Examen Biologique created successfully'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
@csrf_exempt  
def create_examen_radiologique(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            date = data.get('date')
            resultat = data.get('resultat')
            type = data.get('type')
            consultation_id = data.get('consultation_id')
            type_image = data.get('type_image')
            fichier_image = data.get('fichier_image')
            compte_rendu = data.get('compte_rendu')
            radiologue_id = data.get('radiologue_id')

            

        

            # Create ExRadiologique
            examen_radiologique = ExRadiologique.objects.create(
                resultat=resultat,
                type=type,
                consultation_id=consultation_id,
                date=date,
                type_image=type_image,
                fichier_image=fichier_image,
                compte_rendu=compte_rendu,
                radiologue_id=radiologue_id
            )

            return JsonResponse({
                'message': 'Examen Radiologique created successfully',
                'examen': {
                   
                    'type': examen_radiologique.type,
                    'date': examen_radiologique.date,
                    'type_image': examen_radiologique.type_image,
                    'fichier_image': examen_radiologique.fichier_image,
                    'compte_rendu': examen_radiologique.compte_rendu
                }
            }, status=201)

        except Consultation.DoesNotExist:
            return JsonResponse({'error': 'Consultation not found'}, status=404)
        except Radiologue.DoesNotExist:
            return JsonResponse({'error': 'Radiologue not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def get_examen_biologique(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            consultation_id = data.get('consultation_id')

            if not consultation_id:
                return JsonResponse({"status": "error", "message": "consultation_id is required."}, status=400)

            examens_biologiques = ExBiologique.objects.filter(consultation_id=consultation_id)
            
            # Serialize the results
            examens_data = [
                {
                    "id": examen.id,
                    "type": examen.type,
                    "date": examen.date,
                    "resultat": examen.resultat,
                    "consultation_id": examen.consultation_id,
                    "parametres": examen.parametres,
                    "valeurs": examen.valeurs,
                    "graphique_tendance": examen.graphique_tendance,
                    "laborantin_id": examen.laborantin_id,
                    "laborantin_nom": Laborantin.objects.get(id=examen.laborantin_id).nom,
                    "laborantin_prenom": Laborantin.objects.get(id=examen.laborantin_id).prenom,
                }
                for examen in examens_biologiques
            ]
            return JsonResponse({"status": "success", "data": examens_data}, status=200)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "error", "message": "Invalid request method."}, status=405)
@csrf_exempt
def get_examen_radiologique(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            consultation_id = data.get('consultation_id')

            if not consultation_id:
                return JsonResponse({"status": "error", "message": "consultation_id is required."}, status=400)

            examens_radiologiques = ExRadiologique.objects.filter(consultation_id=consultation_id)
            
            # Serialize the results
            examens_data = [
                {
                    "id": examen.id,
                    "type": examen.type,
                    "date": examen.date,
                    "resultat": examen.resultat,
                    "consultation_id": examen.consultation_id,
                    "type_image": examen.type_image,
                    "fichier_image": examen.fichier_image,
                    "compte_rendu": examen.compte_rendu,
                    "radiologue_id": examen.radiologue_id,
                    "radiologue_nom": Radiologue.objects.get(id=examen.laborantin_id).nom,
                    "radiologue_prenom": Radiologue.objects.get(id=examen.laborantin_id).prenom,
                }
                for examen in examens_radiologiques
            ]
            return JsonResponse({"status": "success", "data": examens_data}, status=200)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "error", "message": "Invalid request method."}, status=405)

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
                medecin_traitant = data.get('medecin_traitant')
                personne_contact = data.get('personne_contact')

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

@csrf_exempt
def authentification(request):
    if request.method == "POST":
        data = json.loads(request.body)
        role = data.get('role')
        username = data.get('nss')
        password = data.get('password')

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
                user = Infirmier.objects.get(email=username).user
            except Infirmier.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})
        elif role == 'laborantin':
            try:
                user = Laborantin.objects.get(email=username).user
            except Laborantin.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})
        elif role == 'radiologue':
            try:
                user = Radiologue.objects.get(email=username).user
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
def get_medecin(request):
    # Ensure it's a GET request and both 'nom' and 'prenom' are provided
    if request.method == "GET":
        # Get the 'nom' and 'prenom' from the request's query parameters
        nom = request.GET.get('nom')
        prenom = request.GET.get('prenom')

        # Check if both 'nom' and 'prenom' are provided
        if not nom or not prenom:
            return JsonResponse({'status': 'error', 'message': 'Both "nom" and "prenom" are required.'})

        try:
            # Retrieve Medecin object based on 'nom' and 'prenom'
            medecin = Medecin.objects.get(nom=nom, prenom=prenom)

            # Return the medecin's details in the response
            medecin_data = {
                'id': medecin.id,
                'nom': medecin.nom,
                'prenom': medecin.prenom,
                'email': medecin.email
            }
            return JsonResponse({'status': 'success', 'medecin': medecin_data})

        except Medecin.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Medecin not found.'})
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
def get_patient_by_id(request):
    if request.method == 'POST':
        try:
            # Parse the JSON body
            data = json.loads(request.body)
            idd = data.get('user_id')

            if not idd:
                return JsonResponse({'error': 'NSS is required'}, status=400)

            # Try to find the Patient object
            try:
                patient = Patient.objects.get(user_id=idd)
            except Patient.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            # Prepare the response data
            patient_data = {
                'id': patient.id,
                'nom': patient.nom,
                'prenom': patient.prenom,
                'num_securite_sociale': patient.num_securite_sociale,
                'date_naissance': patient.date_naissance,
                'adress': patient.adress,
                'telephone': patient.telephone,
                'medecin_traitant': f"{patient.medecin_traitant.nom} {patient.medecin_traitant.prenom}" if patient.medecin_traitant else None,
                'personne_contact': patient.personne_contact,
            }

            # Return the patient details
            return JsonResponse({'patient': patient_data})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON body'}, status=400)
    else:
        # Return an error for unsupported request methods
        return JsonResponse({'error': 'Invalid request method. Only POST is supported.'}, status=405)
@csrf_exempt
def get_medecin_patients(request):
    try:
        # Parse the request body to extract user ID
        if request.method == "POST":
            data = json.loads(request.body)  # Assuming JSON payload
            user_id = data.get('userId')  # Extract user ID from the request

            if not user_id:
                return JsonResponse({"error": "User ID is required."}, status=400)

            # Retrieve the Medecin associated with the provided user ID
            medecin = Medecin.objects.get(user_id=user_id)
            medecin_id = medecin.id  # Get the Medecin's ID

            # Retrieve all patients associated with this Medecin
            patients = Patient.objects.filter(medecin_traitant=medecin_id)

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

            # Return the serialized data as JSON
            return JsonResponse({"patients": patients_list}, status=200)
        else:
            return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)

    except Medecin.DoesNotExist:
        return JsonResponse({"error": "Medecin not found for the given user ID."}, status=404)

    except Exception as e:
        return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
def home(request):
    return render(request, 'home.html')

def success(request):
    return render(request, 'create_patient.html')

def medecin(request):
    return render(request, "medecin.html")

@csrf_exempt
def list_ordonnances(request, dossier_id):
    try:
        # Step 1: Fetch all consultations for the `dossier_id`
        consultations = Consultation.objects.filter(dossier_id=dossier_id)
        print(f"Fetching consultations for dossier_id: {dossier_id}")
        print(f"Consultations found: {consultations}")

        consultation_ids = consultations.values_list('id', flat=True)
        print(f"Consultation IDs: {consultation_ids}")

        # Step 2: Fetch all ordonnances associated with these consultations
        ordonnances = Ordonnance.objects.filter(consultation_id__in=consultation_ids)
        print(f"Found ordonnances: {ordonnances}")

        # Step 3: Build the result list
        result = []
        for ordonnance in ordonnances:
            try:
                # Fetch the consultation object for this ordonnance
                consultation = consultations.get(id=int(ordonnance.consultation_id))
                medecin = Medecin.objects.get(id=consultation.medecin_id)

                # Add formatted details to the result list
                result.append({
                    'id': ordonnance.id,
                    'date': ordonnance.date.strftime('%Y-%m-%d'),
                    'medecin': f"Dr. {medecin.nom} {medecin.prenom}",
                    'medecin_id': medecin.id,
                    'etat': 'Complétée' if ordonnance.validated else 'En attente',
                })
                print(f"Processed ordonnance id: {ordonnance.id}")
            except Exception as inner_error:
                print(f"Error processing ordonnance id {ordonnance.id}: {inner_error}")

        return JsonResponse(result, safe=False)
    except Exception as e:
        print(f"Error occurred: {e}")
        return JsonResponse({'error': str(e)}, status=500)
    
@csrf_exempt    
def get_medicaments_by_ordonnance(request, id_ordonnance):
    """
    Returns all medicaments for a given ordonnance_id in JSON format.
    """
    # Fetch all medicament IDs related to the given ordonnance_id
    ordonnance_medicaments = get_list_or_404(OrdonnanceMedicament, ordonnance_id=id_ordonnance)
    medicament_ids = [om.medicament_id for om in ordonnance_medicaments]

    # Fetch all medicaments using the IDs
    medicaments = Medicament.objects.filter(id__in=medicament_ids)
    medicaments_data = [
        {
            'id': medicament.id,
            'nom': medicament.nom,
            'dosage': medicament.dosage,
            'voie_administration': medicament.voie_administration
        }
        for medicament in medicaments
    ]
    return JsonResponse({'medicaments': medicaments_data}, safe=False)

@csrf_exempt  
def get_soins_by_dossier(request, dossier_id):
    """
    Returns soins for a given dossier_id in JSON format.
    """
    soins = get_list_or_404(Soin, dossier_id=dossier_id)  # Fetch soins for the given dossier_id
    soins_data = [
        {
            'id': soin.id,
            'date': soin.date,
            'type': soin.type,
            'description': soin.description,
            'infirmier_id': soin.infirmier_id,
            'dossier_id': soin.dossier_id,
            'observation': soin.observation
        }
        for soin in soins
    ]
    return JsonResponse({'soins': soins_data}, safe=False)

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

class RequestExRadiologiqueView(CreateAPIView):
    queryset = ExRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer

class RequestExBiologiqueView(CreateAPIView):
    queryset = ExBiologique.objects.all()
    serializer_class = ExamenBiologiqueSerializer
class UpdateConsultationView(UpdateAPIView):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
def get_medecin_consultations(request, medecin_id):
    consultations = Consultation.objects.filter(medecin_id=medecin_id)
    consultation_list = [
        {
            "motif": consultation.motif,
            "date": consultation.date,
            "resume": consultation.resume,
            "dossier_id": consultation.dossier_id,
            "medecin_id": consultation.medecin_id,
        }
        for consultation in consultations
    ]
    return JsonResponse({"consultations": consultation_list})
class ListConsultationView(ListAPIView):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer

class ListOrdonnanceView(ListAPIView):
    queryset = Ordonnance.objects.all()
    serializer_class = OrdonnanceSerializer

class ListExRadiologiqueView(ListAPIView):
    queryset = ExRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer

class ListExBiologiqueView(ListAPIView):
    queryset = ExBiologique.objects.all()
    serializer_class = ExamenBiologiqueSerializer

class DeleteOrdonnanceView(DestroyAPIView):
    queryset = Ordonnance.objects.all()
    serializer_class = OrdonnanceSerializer

class DeleteExRadiologiqueView(DestroyAPIView):
    queryset = ExRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer

class DeleteExBiologiqueView(DestroyAPIView):
    queryset = ExBiologique.objects.all()
    serializer_class = ExamenBiologiqueSerializer

class DeleteConsultationView(DestroyAPIView):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer


class ListExRadiologiqueView(ListAPIView):
    queryset = ExRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer

class CreateExRadiologiqueView(CreateAPIView):
    queryset = ExRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer

class UpdateExRadiologiqueView(UpdateAPIView):
    queryset = ExRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer

class DeleteExRadiologiqueView(DestroyAPIView):
    queryset = ExRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer
class ExamenBiologiqueListView(ListAPIView):
    serializer_class = ExamenBiologiqueSerializer

    def get_queryset(self):
        """
        This view should return a list of all biological exams
        for the currently authenticated user.
        """
        
        user = self.request.user
       
        return ExBiologique.objects.filter(laborantin_id=user.id)

class ListExBiologiqueView(ListAPIView):
    queryset = ExBiologique.objects.all()
    serializer_class = ExamenBiologiqueSerializer

class CreateExBiologiqueView(CreateAPIView):
    queryset = ExBiologique.objects.all()
    serializer_class = ExamenBiologiqueSerializer

class UpdateExBiologiqueView(UpdateAPIView):
    queryset = ExBiologique.objects.all()
    serializer_class = ExamenBiologiqueSerializer

class DeleteExBiologiqueView(DestroyAPIView):
    queryset = ExBiologique.objects.all()
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

class ExRadiologiqueDetailView(RetrieveAPIView):
    serializer_class = ExamenRadiologiqueSerializer
    queryset = ExRadiologique.objects.all()

class ExBiologiqueDetailView(RetrieveAPIView):
    serializer_class = ExamenBiologiqueSerializer
    queryset = ExBiologique.objects.all()


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
class ConsultationListView(ListAPIView):
    serializer_class = ConsultationSerializer

    def get_queryset(self):
        """
        This view should return a list of all consultations
        for the currently authenticated user.
        """

        user = self.request.user
        try:
            medecin = Medecin.objects.get(user_id=user.id)  # Assuming Medecin has a foreign key to User # Assuming Medecin has a foreign key to User
        except Medecin.DoesNotExist:
            return Consultation.objects.none()
        return Consultation.objects.filter(medecin_id=medecin.id)
    
class UpdateOrdonnanceView(UpdateAPIView):
    queryset = Ordonnance.objects.all()
    serializer_class = OrdonnanceSerializer

class MedicalExamListView(ListAPIView):
    serializer_class = ExamenBiologiqueSerializer

    def get_queryset(self):
        """
        This view should return a list of all medical exams
        for the currently authenticated user.
        """
        user = self.request.user
        return ExBiologique.objects.filter(medecin=user)
class UpdateExRadiologiqueView(UpdateAPIView):
    queryset = ExRadiologique.objects.all()
    serializer_class = ExamenRadiologiqueSerializer

    def get_queryset(self):
        """
        This view should return a list of all medical exams
        for the currently authenticated user's consultation.
        """
        user = self.request.user
        return ExRadiologique.objects.filter(consultation__medecin=user)

class UpdateExBiologiqueView(UpdateAPIView):
    queryset = ExBiologique.objects.all()
    serializer_class = ExamenBiologiqueSerializer

    def get_queryset(self):
        """
        This view should return a list of all medical exams
        for the currently authenticated user's consultation.
        """
        user = self.request.user
        return ExBiologique.objects.filter(consultation__medecin=user)
    
class ExRadiologiqueListView(ListAPIView):
    serializer_class = ExamenRadiologiqueSerializer

    def get_queryset(self):
        """
        This view should return a list of all radiological exams
        for the currently authenticated user.
        """
        user = self.request.user
        return ExRadiologique.objects.filter(radiologue=user)
class ExBiologiqueListView(ListAPIView):
    serializer_class = ExamenBiologiqueSerializer

    def get_queryset(self):
        """
        This view should return a list of all biological exams
        for the currently authenticated user.
        """
        user = self.request.user
        return ExBiologique.objects.filter(laborantin=user)

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