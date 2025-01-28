from django.test import TestCase,reverse, resolve
from . import views
class TestUrls(TestCase):

    def test_home_url_is_resolved(self):
        url = reverse('home')
        self.assertEqual(resolve(url).func, views.home)

    def test_Admin_url_is_resolved(self):
        url = reverse('Admin')
        self.assertEqual(resolve(url).func, views.Admin)

    def test_authentification_url_is_resolved(self):
        url = reverse('authentification')
        self.assertEqual(resolve(url).func, views.authentification)

    def test_signup_url_is_resolved(self):
        url = reverse('token_verify')
        self.assertEqual(resolve(url).func, views.signup)

    def test_patient_list_url_is_resolved(self):
        url = reverse('patient_list')
        self.assertEqual(resolve(url).func, views.patient_list)

    def test_patient_detail_url_is_resolved(self):
        url = reverse('patient_detail', kwargs={'id': 1})
        self.assertEqual(resolve(url).func, views.patient_detail)

    def test_patient_delete_url_is_resolved(self):
        url = reverse('patient_delete', kwargs={'id': 1})
        self.assertEqual(resolve(url).func, views.patient_destroy)

    def test_medecin_list_url_is_resolved(self):
        url = reverse('medecin_list')
        self.assertEqual(resolve(url).func, views.medecin_list)

    def test_medecin_detail_url_is_resolved(self):
        url = reverse('medecin_detail', kwargs={'id': 1})
        self.assertEqual(resolve(url).func, views.medecin_detail)

    def test_medecin_delete_url_is_resolved(self):
        url = reverse('medecin_delete', kwargs={'id': 1})
        self.assertEqual(resolve(url).func, views.medecin_destroy)

    def test_pharmacien_list_url_is_resolved(self):
        url = reverse('pharmacien_list')
        self.assertEqual(resolve(url).func, views.pharmacien_list)

    def test_pharmacien_detail_url_is_resolved(self):
        url = reverse('pharmacien_detail', kwargs={'id': 1})
        self.assertEqual(resolve(url).func, views.pharmacien_detail)

    def test_pharmacien_delete_url_is_resolved(self):
        url = reverse('pharmacien_delete', kwargs={'id': 1})
        self.assertEqual(resolve(url).func, views.pharmacien_destroy)

    def test_radiologue_list_url_is_resolved(self):
        url = reverse('radiologue_list')
        self.assertEqual(resolve(url).func, views.radiologue_list)

    def test_radiologue_detail_url_is_resolved(self):
        url = reverse('radiologue_detail', kwargs={'id': 1})
        self.assertEqual(resolve(url).func, views.radiologue_detail)

    def test_radiologue_delete_url_is_resolved(self):
        url = reverse('radiologue_delete', kwargs={'id': 1})
        self.assertEqual(resolve(url).func, views.radiologue_destroy)

    def test_infirmier_list_url_is_resolved(self):
        url = reverse('infirmier_list')
        self.assertEqual(resolve(url).func, views.infirmier_list)

    def test_infirmier_detail_url_is_resolved(self):
        url = reverse('infirmier_detail', kwargs={'id': 1})
        self.assertEqual(resolve(url).func, views.infirmier_detail)

    def test_infirmier_delete_url_is_resolved(self):
        url = reverse('infirmier_delete', kwargs={'id': 1})
        self.assertEqual(resolve(url).func, views.infirmier_destroy)

    def test_examen_list_url_is_resolved(self):
        url = reverse('examen_list')
        self.assertEqual(resolve(url).func, views.examen_list)

    def test_examen_detail_url_is_resolved(self):
        url = reverse('examen_detail', kwargs={'id': 1})
        self.assertEqual(resolve(url).func, views.examen_detail)

    def test_examen_delete_url_is_resolved(self):
        url = reverse('examen_delete', kwargs={'id': 1})
        self.assertEqual(resolve(url).func, views.examen_destroy)
def test_ordonnance_list_url_is_resolved(self):
    url = reverse('ordonnance_list')
    self.assertEqual(resolve(url).func.view_class, views.OrdonnanceListView)

def test_ordonnance_detail_url_is_resolved(self):
    url = reverse('ordonnance_detail', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.OrdonnanceDetailView)

def test_ordonnance_delete_url_is_resolved(self):
    url = reverse('ordonnance_delete', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.DeleteOrdonnanceView)

def test_create_consultation_url_is_resolved(self):
    url = reverse('create_consultation')
    self.assertEqual(resolve(url).func.view_class, views.CreateConsultationView)

def test_consultation_list_url_is_resolved(self):
    url = reverse('consultation_list')
    self.assertEqual(resolve(url).func, views.ConsultationListView)

def test_update_consultation_url_is_resolved(self):
    url = reverse('update_consultation', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.UpdateConsultationView)

def test_delete_consultation_url_is_resolved(self):
    url = reverse('delete_consultation', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.DeleteConsultationView)

def test_medecin_ordonnance_list_url_is_resolved(self):
    url = reverse('medecin_ordonnance_list')
    self.assertEqual(resolve(url).func.view_class, views.OrdonnanceListView)

def test_update_ordonnance_url_is_resolved(self):
    url = reverse('update_ordonnance', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.UpdateOrdonnanceView)

def test_delete_medecin_ordonnance_url_is_resolved(self):
    url = reverse('delete_ordonnance', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.DeleteOrdonnanceView)

def test_request_exam_radiologique_url_is_resolved(self):
    url = reverse('request_exam_radiologique')
    self.assertEqual(resolve(url).func.view_class, views.RequestExamenRadiologiqueView)

def test_request_exam_biologique_url_is_resolved(self):
    url = reverse('request_exam_biologique')
    self.assertEqual(resolve(url).func.view_class, views.RequestExamenBiologiqueView)

def test_exam_radiologique_list_url_is_resolved(self):
    url = reverse('exam_radiologique_list')
    self.assertEqual(resolve(url).func.view_class, views.ExamenRadiologiqueListView)

def test_exam_biologique_list_url_is_resolved(self):
    url = reverse('exam_biologique_list')
    self.assertEqual(resolve(url).func.view_class, views.ExamenBiologiqueListView)

def test_delete_exam_radiologique_url_is_resolved(self):
    url = reverse('delete_exam_radiologique', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.DeleteExamenRadiologiqueView)

def test_delete_exam_biologique_url_is_resolved(self):
    url = reverse('delete_exam_biologique', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.DeleteExamenBiologiqueView)

def test_examen_radiologique_list_url_is_resolved(self):
    url = reverse('examen_radiologique_list')
    self.assertEqual(resolve(url).func.view_class, views.ExamenRadiologiqueListView)

def test_examen_radiologique_detail_url_is_resolved(self):
    url = reverse('examen_radiologique_detail', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.ExamenRadiologiqueDetailView)

def test_examen_radiologique_delete_url_is_resolved(self):
    url = reverse('delete_examen_radiologique', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.DeleteExamenRadiologiqueView)

def test_examen_biologique_list_url_is_resolved(self):
    url = reverse('examen_biologique_list')
    self.assertEqual(resolve(url).func.view_class, views.ExamenBiologiqueListView)

def test_examen_biologique_detail_url_is_resolved(self):
    url = reverse('examen_biologique_detail', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.ExamenBiologiqueDetailView)

def test_examen_biologique_delete_url_is_resolved(self):
    url = reverse('delete_examen_biologique', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.DeleteExamenBiologiqueView)

def test_compte_rendu_list_url_is_resolved(self):
    url = reverse('compte_rendu_list')
    self.assertEqual(resolve(url).func.view_class, views.CompteRenduListView)

def test_compte_rendu_detail_url_is_resolved(self):
    url = reverse('compte_rendu_detail', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.CompteRenduDetailView)

def test_compte_rendu_delete_url_is_resolved(self):
    url = reverse('delete_compte_rendu', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.DeleteCompteRenduView)

def test_medicament_list_url_is_resolved(self):
    url = reverse('medicament_list')
    self.assertEqual(resolve(url).func.view_class, views.MedicamentListView)

def test_medicament_detail_url_is_resolved(self):
    url = reverse('medicament_detail', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.MedicamentDetailView)

def test_medicament_delete_url_is_resolved(self):
    url = reverse('delete_medicament', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.DeleteMedicamentView)

def test_ordonnance_medicament_list_url_is_resolved(self):
    url = reverse('ordonnance_medicament_list')
    self.assertEqual(resolve(url).func.view_class, views.OrdonnanceMedicamentListView)

def test_ordonnance_medicament_detail_url_is_resolved(self):
    url = reverse('ordonnance_medicament_detail', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.OrdonnanceMedicamentDetailView)

def test_ordonnance_medicament_delete_url_is_resolved(self):
    url = reverse('delete_ordonnance_medicament', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.DeleteOrdonnanceMedicamentView)

def test_certificat_medical_list_url_is_resolved(self):
    url = reverse('certificat_medical_list')
    self.assertEqual(resolve(url).func.view_class, views.CertificatMedicalListView)

def test_certificat_medical_detail_url_is_resolved(self):
    url = reverse('certificat_medical_detail', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.CertificatMedicalDetailView)

def test_certificat_medical_delete_url_is_resolved(self):
    url = reverse('delete_certificat_medical', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.DeleteCertificatMedicalView)

def test_soin_list_url_is_resolved(self):
    url = reverse('soin_list')
    self.assertEqual(resolve(url).func.view_class, views.SoinListView)

def test_soin_detail_url_is_resolved(self):
    url = reverse('soin_detail', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.SoinDetailView)

def test_soin_delete_url_is_resolved(self):
    url = reverse('delete_soin', kwargs={'pk': 1})
    self.assertEqual(resolve(url).func.view_class, views.DeleteSoinView)

def test_create_dossier_patient_url_is_resolved(self):
    url = reverse('create_dossier_patient')
    self.assertEqual(resolve(url).func, views.create_dossier_patient)

def test_search_dossier_patient_url_is_resolved(self):
    url = reverse('search_dossier_patient', kwargs={'num_securite_sociale': '123456789'})
    self.assertEqual(resolve(url).func, views.search_dossier_patient)

def test_medecin_patients_url_is_resolved(self):
    url = reverse('medecin_patients')
    self.assertEqual(resolve(url).func, views.get_medecin_patients)

def test_search_dossier_patient_by_id_url_is_resolved(self):
    url = reverse('search_dossier_patient_by_id', kwargs={'patient_id': 1})
    self.assertEqual(resolve(url).func, views.search_dossier_patient_by_id)

def test_consultations_by_patient_url_is_resolved(self):
    url = reverse('consultations_by_patient', kwargs={'dossier_id': 'dossier123'})
    self.assertEqual(resolve(url).func, views.consultations_by_patient)

def test_create_consultation_by_patient_url_is_resolved(self):
    url = reverse('create_consultation', kwargs={'dossier_id': 'dossier123'})
    self.assertEqual(resolve(url).func, views.create_consultation)

def test_add_ordonnance_url_is_resolved(self):
    url = reverse('add_ordonnance', kwargs={'consultation_id': 1})
    self.assertEqual(resolve(url).func, views.create_ordonnance)

def test_create_antecedent_url_is_resolved(self):
    url = reverse('create_antecedent', kwargs={'dossier_id': 1})
    self.assertEqual(resolve(url).func, views.create_antecedent)

def test_create_bilan_biologique_url_is_resolved(self):
    url = reverse('create_bilan_biologique', kwargs={'consultation_id': 'consult123', 'dossier_id': 'dossier123'})
    self.assertEqual(resolve(url).func, views.create_bilan_biologique)

def test_create_bilan_radiologique_url_is_resolved(self):
    url = reverse('create_bilan_radiologique', kwargs={'consultation_id': 'consult123', 'dossier_id': 'dossier123'})
    self.assertEqual(resolve(url).func, views.create_bilan_radiologique)

def test_list_ordonnances_url_is_resolved(self):
    url = reverse('list_ordonnances', kwargs={'dossier_id': 1})
    self.assertEqual(resolve(url).func, views.list_ordonnances)

def test_get_medicaments_by_ordonnance_url_is_resolved(self):
    url = reverse('get_medicaments_by_ordonnance', kwargs={'id_ordonnance': 1})
    self.assertEqual(resolve(url).func, views.get_medicaments_by_ordonnance)

def test_get_soins_by_dossier_url_is_resolved(self):
    url = reverse('get_soins_by_dossier', kwargs={'dossier_id': 'dossier123'})
    self.assertEqual(resolve(url).func, views.get_soins_by_dossier)
