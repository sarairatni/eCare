from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient,APITestCase
from app.models import Patient, Medecin, Infirmier, Laborantin, Radiologue
from django.contrib.auth.models import User

class TestAuthentificationView(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="user1", password="password")
        self.patient = Patient.objects.create(user=self.user, num_securite_sociale="1234567890", nom="Pierre", prenom="Dupont")
        self.medecin = Medecin.objects.create(user=self.user, email="medecin@example.com")
        self.infirmier = Infirmier.objects.create(user=self.user, num_securite_sociale="0987654321")
        self.laborantin = Laborantin.objects.create(user=self.user, num_securite_sociale="1122334455")
        self.radiologue = Radiologue.objects.create(user=self.user, num_securite_sociale="6677889900")

    def test_authentification_patient(self):
        response = self.client.post(reverse('authentification'), {
            'nss': self.patient.num_securite_sociale,
            'password': 'password',
            'role': 'patient'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['role'], 'patient')

    def test_authentification_medecin(self):
        response = self.client.post(reverse('authentification'), {
            'nss': self.medecin.email,
            'password': 'password',
            'role': 'medecin'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['role'], 'medecin')

    def test_authentification_infirmier(self):
        response = self.client.post(reverse('authentification'), {
            'nss': self.infirmier.num_securite_sociale,
            'password': 'password',
            'role': 'infirmier'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['role'], 'infirmier')

    def test_authentification_laborantin(self):
        response = self.client.post(reverse('authentification'), {
            'nss': self.laborantin.num_securite_sociale,
            'password': 'password',
            'role': 'laborantin'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['role'], 'laborantin')

    def test_authentification_radiologue(self):
        response = self.client.post(reverse('authentification'), {
            'nss': self.radiologue.num_securite_sociale,
            'password': 'password',
            'role': 'radiologue'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['role'], 'radiologue')
def test_authentification_invalid_credentials(self):
    response = self.client.post(reverse('authentification'), {
        'nss': 'invalid',
        'password': 'wrongpassword',
        'role': 'patient'
    }, format='json')
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    self.assertEqual(response.data['status'], 'error')
    self.assertEqual(response.data['message'], 'Invalid credentials')

class TestGetPatientNameView(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="user1", password="password")
        self.patient = Patient.objects.create(user=self.user, num_securite_sociale="1234567890", nom="Pierre", prenom="Dupont")

    def test_get_patient_name(self):
        response = self.client.get(reverse('get_patient_name', args=[self.patient.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nom'], 'Pierre')
        self.assertEqual(response.data['prenom'], 'Dupont')


class TestConsultationListView(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="user1", password="password")
        self.medecin = Medecin.objects.create(user=self.user, email="medecin@example.com")

    def test_get_consultations(self):
        response = self.client.get(reverse('consultation_list', args=[self.medecin.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
class TestBilanBiologiqueView(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="user1", password="password")
        self.medecin = Medecin.objects.create(user=self.user, email="medecin@example.com")

    def test_get_bilans_biologiques(self):
        response = self.client.get(reverse('bilan_biologique_list', args=[self.medecin.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

class TestBilanRadiologiqueView(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="user1", password="password")
        self.medecin = Medecin.objects.create(user=self.user, email="medecin@example.com")

    def test_get_bilans_radiologiques(self):
        response = self.client.get(reverse('bilan_radiologique_list', args=[self.medecin.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

class TestCertificatMedicalView(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="user1", password="password")
        self.medecin = Medecin.objects.create(user=self.user, email="medecin@example.com")

    def test_get_certificats_medicaux(self):
        response = self.client.get(reverse('certificat_medical_list', args=[self.medecin.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)


class TestGetMedecinNameView(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="user1", password="password")
        self.medecin = Medecin.objects.create(user=self.user, email="medecin@example.com", nom="Pierre", prenom="Dupont")

    def test_get_medecin_name(self):
        response = self.client.get(reverse('get_medecin_name', args=[self.medecin.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nom'], 'Pierre')
        self.assertEqual(response.data['prenom'], 'Dupont')
