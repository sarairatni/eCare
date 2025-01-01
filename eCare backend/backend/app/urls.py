from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Home Page
    path('', views.home, name='home'),  # Root URL
    path('Admin/', views.Admin, name='Admin'),

    # Auth & Token
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Patients
    path('patients/', views.patient_list, name='patient_list'),  # List patients
    path('patients/<int:id>/', views.patient_detail, name='patient_detail'),  # Patient details by ID
    path('patients/<int:id>/delete/', views.patient_destroy, name='patient_delete'),

    # Medecins
    path('medecins/', views.medecin_list, name='medecin_list'),  # List medecins
    path('medecins/<int:id>/', views.medecin_detail, name='medecin_detail'),
    path('medecins/<int:id>/delete/', views.medecin_destroy, name='medecin_delete'),

    # Pharmacien
    path('pharmaciens/', views.pharmacien_list, name='pharmacien_list'),  # List pharmacien
    path('pharmaciens/<int:id>/', views.pharmacien_detail, name='pharmacien_detail'),
    path('pharmaciens/<int:id>/delete/', views.pharmacien_destroy, name='pharmacien_delete'),

    # Radiologues
    path('radiologues/', views.radiologue_list, name='radiologue_list'),  # List radiologue
    path('radiologues/<int:id>/', views.radiologue_detail, name='radiologue_detail'),
    path('radiologues/<int:id>/delete/', views.radiologue_destroy, name='radiologue_delete'),

    # Infirmiers
    path('infirmiers/', views.infirmier_list, name='infirmier_list'),  # List infirmier
    path('infirmiers/<int:id>/', views.infirmier_detail, name='infirmier_detail'),
    path('infirmiers/<int:id>/delete/', views.infirmier_destroy, name='infirmier_delete'),

    # Examens (Radiologique and Biologique)
    path('examens/', views.examen_list, name='examen_list'),  # List examens
    path('examens/<int:id>/', views.examen_detail, name='examen_detail'),
    path('examens/<int:id>/delete/', views.examen_destroy, name='examen_delete'),
    
    # Ordonnances
    path('ordonnances/', views.OrdonnanceListView.as_view(), name='ordonnance_list'),
    path('ordonnances/<int:pk>/', views.OrdonnanceDetailView.as_view(), name='ordonnance_detail'),
    path('ordonnances/<int:pk>/delete/', views.DeleteOrdonnanceView.as_view(), name='ordonnance_delete'),

    # Consultation
    path('medecin/consultation/create/', views.CreateConsultationView.as_view(), name='create_consultation'),
    path('medecin/consultation/list/', views.ConsultationListView.as_view(), name='consultation_list'),
    path('medecin/consultation/update/<int:pk>/', views.UpdateConsultationView.as_view(), name='update_consultation'),
    path('medecin/consultation/delete/<int:pk>/', views.DeleteConsultationView.as_view(), name='delete_consultation'),

    # Medecin Ordonnances
    path('medecin/ordonnance/add/', views.AddOrdonnanceView.as_view(), name='add_ordonnance'),
    path('medecin/ordonnance/list/', views.OrdonnanceListView.as_view(), name='ordonnance_list'),
    path('medecin/ordonnance/update/<int:pk>/', views.UpdateOrdonnanceView.as_view(), name='update_ordonnance'),
    path('medecin/ordonnance/delete/<int:pk>/', views.DeleteOrdonnanceView.as_view(), name='delete_ordonnance'),

    # Examens (Radiologique and Biologique) for Medecins
    path('medecin/examens/radiologique/request/', views.RequestExamenRadiologiqueView.as_view(), name='request_exam_radiologique'),
    path('medecin/examens/biologique/request/', views.RequestExamenBiologiqueView.as_view(), name='request_exam_biologique'),
    path('medecin/examens/radiologique/list/', views.ExamenRadiologiqueListView.as_view(), name='exam_radiologique_list'),
    path('medecin/examens/biologique/list/', views.ExamenBiologiqueListView.as_view(), name='exam_biologique_list'),

    # Specific Examen Radiologique/Biologique delete
    path('medecin/examens/radiologique/delete/<int:pk>/', views.DeleteExamenRadiologiqueView.as_view(), name='delete_exam_radiologique'),
    path('medecin/examens/biologique/delete/<int:pk>/', views.DeleteExamenBiologiqueView.as_view(), name='delete_exam_biologique'),

    # Examen Radiologique/Biologique general
    path('examens/radiologiques/', views.ExamenRadiologiqueListView.as_view(), name='examen_radiologique_list'),
    path('examens/radiologiques/<int:pk>/', views.ExamenRadiologiqueDetailView.as_view(), name='examen_radiologique_detail'),
    path('examens/radiologiques/<int:pk>/delete/', views.DeleteExamenRadiologiqueView.as_view(), name='delete_examen_radiologique'),
    
    path('examens/biologiques/', views.ExamenBiologiqueListView.as_view(), name='examen_biologique_list'),
    path('examens/biologiques/<int:pk>/', views.ExamenBiologiqueDetailView.as_view(), name='examen_biologique_detail'),
    path('examens/biologiques/<int:pk>/delete/', views.DeleteExamenBiologiqueView.as_view(), name='delete_examen_biologique'),

    # Comptes Rendus
    path('comptes_rendus/', views.CompteRenduListView.as_view(), name='compte_rendu_list'),
    path('comptes_rendus/<int:pk>/', views.CompteRenduDetailView.as_view(), name='compte_rendu_detail'),
    path('comptes_rendus/<int:pk>/delete/', views.DeleteCompteRenduView.as_view(), name='delete_compte_rendu'),

    # Medicaments
    path('medicaments/', views.MedicamentListView.as_view(), name='medicament_list'),
    path('medicaments/<int:pk>/', views.MedicamentDetailView.as_view(), name='medicament_detail'),
    path('medicaments/<int:pk>/delete/', views.DeleteMedicamentView.as_view(), name='delete_medicament'),

    # Ordonnance Medicaments
    path('ordonnances/medicaments/', views.OrdonnanceMedicamentListView.as_view(), name='ordonnance_medicament_list'),
    path('ordonnances/medicaments/<int:pk>/', views.OrdonnanceMedicamentDetailView.as_view(), name='ordonnance_medicament_detail'),
    path('ordonnances/medicaments/<int:pk>/delete/', views.DeleteOrdonnanceMedicamentView.as_view(), name='delete_ordonnance_medicament'),

    # Certificats Medicaux
    path('certificats_medicaux/', views.CertificatMedicalListView.as_view(), name='certificat_medical_list'),
    path('certificats_medicaux/<int:pk>/', views.CertificatMedicalDetailView.as_view(), name='certificat_medical_detail'),
    path('certificats_medicaux/<int:pk>/delete/', views.DeleteCertificatMedicalView.as_view(), name='delete_certificat_medical'),

    # Soins
    path('soins/', views.SoinListView.as_view(), name='soin_list'),
    path('soins/<int:pk>/', views.SoinDetailView.as_view(), name='soin_detail'),
    path('soins/<int:pk>/delete/', views.DeleteSoinView.as_view(), name='delete_soin'),

    # Dossier Patient Creation and Search
    path('create_dossier_patient/', views.create_dossier_patient, name='create_dossier_patient'),
    path('search_dossier_patient/<str:num_securite_sociale>/', views.search_dossier_patient, name='search_dossier_patient'),

    # Consultation and Ordonnance Creation
    path('create_ordonnance/<str:consultation_id>/', views.create_ordonnance, name='create_ordonnance'),
    path('create_consultation/', views.create_consultation, name='create_consultation'),
]