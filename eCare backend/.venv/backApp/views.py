from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User
from .user_serializer import UserWithRoleSerializer
from .user_serializer import IsAdminOrReadOnly 
from django.http import JsonResponse
from .models import Patient , Medecin, Pharmacien, Infermier, Technicien, Radiologue, Prescription, Examen
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .user_serializer import PatientSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserWithRoleSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserWithRoleSerializer
    permission_classes = [IsAdminOrReadOnly]
# Create your views here.
from django.forms.models import model_to_dict



from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_http_methods

@api_view(['GET', 'POST'])
@csrf_exempt
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
@require_http_methods(["GET", "POST"])
def patient_destroy(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        patient = Patient.objects.get(pk=id)
        patient.delete()
        return JsonResponse({'message': 'Patient deleted'}, status=200)
    except Patient.DoesNotExist:
        return JsonResponse({'error': 'Patient not found'}, status=404)


@csrf_exempt
@require_http_methods(["GET", "POST"])
def medecin_list(request):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    medecins = list(Medecin.objects.all())
    medecin_dicts = [model_to_dict(medecin) for medecin in medecins]
    return JsonResponse(medecin_dicts, safe=False)

@csrf_exempt
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
@require_http_methods(["GET", "POST"])
def radiologue_list(request):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    radiologues = list(Radiologue.objects.all())
    radiologue_dicts = [model_to_dict(radiologue) for radiologue in radiologues]
    return JsonResponse(radiologue_dicts, safe=False)

@csrf_exempt
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
@require_http_methods(["GET", "POST"])
def prescription_list(request):
    
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    prescriptions = list(Prescription.objects.all())
    prescription_dicts = [model_to_dict(prescription) for prescription in prescriptions]
    return JsonResponse(prescription_dicts, safe=False)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def prescription_detail(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        prescription = Prescription.objects.get(pk=id)
        return JsonResponse(model_to_dict(prescription))
    except Prescription.DoesNotExist:
        return JsonResponse({'error': 'Prescription not found'}, status=404)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def prescription_destroy(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        prescription = Prescription.objects.get(pk=id)
        prescription.delete()
        return JsonResponse({'message': 'Prescription deleted'}, status=200)
    except Prescription.DoesNotExist:
        return JsonResponse({'error': 'Prescription not found'}, status=404)


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
def technicien_list(request):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    techniciens = list(Technicien.objects.all())
    technicien_dicts = [model_to_dict(technicien) for technicien in techniciens]
    return JsonResponse(technicien_dicts, safe=False)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def technicien_detail(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        technicien = Technicien.objects.get(pk=id)
        return JsonResponse(model_to_dict(technicien))
    except Technicien.DoesNotExist:
        return JsonResponse({'error': 'Technicien not found'}, status=404)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def technicien_destroy(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        technicien = Technicien.objects.get(pk=id)
        technicien.delete()
        return JsonResponse({'message': 'Technicien deleted'}, status=200)
    except Technicien.DoesNotExist:
        return JsonResponse({'error': 'Technicien not found'}, status=404)


@csrf_exempt
@require_http_methods(["GET", "POST"])
def infermier_list(request):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    infermiers = list(Infermier.objects.all())
    infermier_dicts = [model_to_dict(infermier) for infermier in infermiers]
    return JsonResponse(infermier_dicts, safe=False)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def infermier_detail(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        infermier = Infermier.objects.get(pk=id)
        return JsonResponse(model_to_dict(infermier))
    except Infermier.DoesNotExist:
        return JsonResponse({'error': 'Infermier not found'}, status=404)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def infermier_destroy(request, id):
    if request.method == 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        infermier = Infermier.objects.get(pk=id)
        infermier.delete()
        return JsonResponse({'message': 'Infermier deleted'}, status=200)
    except Infermier.DoesNotExist:
        return JsonResponse({'error': 'Infermier not found'}, status=404)



