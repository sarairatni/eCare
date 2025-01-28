from django.urls import path
from . import views  # Import views from your application

app_name = 'backApp'
urlpatterns = [
    path('patients/', views.patient_list, name='patient_list'),  # List patients
    path('medecins/', views.medecin_list, name='medecin_list'),  # List medecins
    path('pharmaciens/', views.pharmacien_list, name='pharmacien_list'),  # List pharmacien
    path('radiologues/', views.radiologue_list, name='radiologue_list'),  # List radiologue
    path('examens/', views.examen_list, name='examen_list'),  # List examens
    path('prescriptions/', views.prescription_list, name='prescription_list'),  # List prescriptions
    path('patients/<int:id>/', views.patient_detail, name='patient_detail'), # Patient details by ID
    path('medecins/<int:id>/', views.medecin_detail, name='medecin_detail'),
    path('pharmaciens/<int:id>/', views.pharmacien_detail, name='pharmacien_detail'),
    path('radiologues/<int:id>/', views.radiologue_detail, name='radiologue_detail'),
    path('examens/<int:id>/', views.examen_detail, name='examen_detail'),
    path('prescriptions/<int:id>/', views.prescription_detail, name='prescription_detail'),
    path('patients/<int:id>/delete/', views.patient_destroy, name='patient_delete'),
    path('medecins/<int:id>/delete/', views.medecin_destroy, name='medecin_delete'),
    path('pharmaciens/<int:id>/delete/', views.pharmacien_destroy, name='pharmacien_delete'),
    path('radiologues/<int:id>/delete/', views.radiologue_destroy, name='radiologue_delete'),
    path('examens/<int:id>/delete/', views.examen_destroy, name='examen_delete'),
    path('prescriptions/<int:id>/delete/', views.prescription_destroy, name='prescription_delete'),

]

