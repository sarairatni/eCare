from django.test import TestCase,reverse, resolve
from django.test import TestCase
from django.contrib.auth.models import User
from models import *

class TestPatientModel(TestCase):
    def setUp(self):
        user = User.objects.create_user(username='patient_user', password='testpass')
        medecin = Medecin.objects.create(user=User.objects.create_user(username='medecin_user', password='testpass'), nom='Medecin', prenom='Principal', email='medecin@example.com')
        self.patient = Patient.objects.create(
            user=user,
            num_securite_sociale="123456789",
            nom="Patient",
            prenom="Example",
            date_naissance="2000-01-01",
            adress="123 Main St",
            telephone="1234567890",
            medecin_traitant=medecin,
            personne_contact="Contact Example",
        )

    def test_patient_creation(self):
        self.assertEqual(str(self.patient), "Patient Example - NSS: 123456789")

class TestMedecinModel(TestCase):
    def setUp(self):
        user = User.objects.create_user(username='medecin_user', password='testpass')
        self.medecin = Medecin.objects.create(user=user, nom='Medecin', prenom='Example', email='medecin@example.com')

    def test_medecin_creation(self):
        self.assertEqual(str(self.medecin), "Dr. Medecin Example")

class TestPharmacienModel(TestCase):
    def setUp(self):
        user = User.objects.create_user(username='pharmacien_user', password='testpass')
        self.pharmacien = Pharmacien.objects.create(user=user, nom='Pharmacien', prenom='Example', email='pharmacien@example.com')

    def test_pharmacien_creation(self):
        self.assertEqual(str(self.pharmacien), "Dr. Pharmacien Example")

class TestInfirmierModel(TestCase):
    def setUp(self):
        user = User.objects.create_user(username='infirmier_user', password='testpass')
        self.infirmier = Infirmier.objects.create(user=user, nom='Infirmier', prenom='Example', email='infirmier@example.com')

    def test_infirmier_creation(self):
        self.assertEqual(str(self.infirmier), "Infirmier Example")

class TestLaborantinModel(TestCase):
    def setUp(self):
        user = User.objects.create_user(username='laborantin_user', password='testpass')
        self.laborantin = Laborantin.objects.create(user=user, nom='Laborantin', prenom='Example', email='laborantin@example.com')

    def test_laborantin_creation(self):
        self.assertEqual(str(self.laborantin), "Laborantin Example")

class TestRadiologueModel(TestCase):
    def setUp(self):
        user = User.objects.create_user(username='radiologue_user', password='testpass')
        self.radiologue = Radiologue.objects.create(user=user, nom='Radiologue', prenom='Example', email='radiologue@example.com')

    def test_radiologue_creation(self):
        self.assertEqual(str(self.radiologue), "Radiologue Example")

class TestConsultationModel(TestCase):
    def setUp(self):
        self.consultation = Consultation.objects.create(
            motif="Routine Checkup",
            date="2025-01-01",
            resume="Everything looks good.",
            dossier_id="D001",
            medecin_id="M001",
        )

    def test_consultation_creation(self):
        self.assertEqual(str(self.consultation), "Consultation on 2025-01-01 - Motif: Routine Checkup")

class TestExamenRadiologiqueModel(TestCase):
    def setUp(self):
        consultation = Consultation.objects.create(
            motif="X-Ray",
            date="2025-01-01",
            resume="Chest X-Ray performed.",
            dossier_id="D002",
            medecin_id="M002",
        )
        radiologue = Radiologue.objects.create(
            user=User.objects.create_user(username='radiologue2_user', password='testpass'),
            nom='Radiologue', prenom='Two', email='radiologue2@example.com'
        )
        self.examen_radiologique = ExamenRadiologique.objects.create(
            consultation=consultation,
            type_image="X-Ray",
            fichier_image="image_data",
            compte_rendu="No issues detected.",
            radiologue=radiologue
        )

    def test_examen_radiologique_creation(self):
        self.assertEqual(self.examen_radiologique.type_image, "X-Ray")
        self.assertEqual(self.examen_radiologique.compte_rendu, "No issues detected.")

class TestExamenBiologiqueModel(TestCase):
    def setUp(self):
        consultation = Consultation.objects.create(
            motif="Blood Test",
            date="2025-01-01",
            resume="Routine blood test performed.",
            dossier_id="D003",
            medecin_id="M003",
        )
        laborantin = Laborantin.objects.create(
            user=User.objects.create_user(username='laborantin2_user', password='testpass'),
            nom='Laborantin', prenom='Two', email='laborantin2@example.com'
        )
        self.examen_biologique = ExamenBiologique.objects.create(
            consultation=consultation,
            parametres="Glucose, Cholesterol",
            valeurs="5.5, 190",
            graphique_tendance="trend_data",
            laborantin=laborantin
        )

    def test_examen_biologique_creation(self):
        self.assertEqual(self.examen_biologique.parametres, "Glucose, Cholesterol")
        self.assertEqual(self.examen_biologique.valeurs, "5.5, 190")
class TestCompteRenduModel(TestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username="user1", password="password")
        cls.user = User.objects.get(id=1)
        medecin = Medecin.objects.create(user=cls.user, nom="Dr. Pierre", prenom="Dupont", email="pierre.dupont@example.com")
        patient = Patient.objects.create(user=cls.user, num_securite_sociale="1234567890", nom="Pierre", prenom="Dupont", date_naissance="1990-01-01", adress="1 rue de la paix", telephone="0606060606", medecin_traitant_id=1, personne_contact="Jean Dupont")
        consultation = Consultation.objects.create(motif="Test consultation", date="2020-01-01", resume="Test resume", dossier_id=1, medecin_id=1)
        examen = ExamenBiologique.objects.create(consultation=consultation, parametres="Test parametres", valeurs="Test valeurs", graphique_tendance="Test graphique", laborantin_id=1)
        CompteRendu.objects.create(date="2020-01-01", contenu="Test compte rendu", auteur_id=1, examen_id=examen.id)

    def test_compte_rendu_str(self):
        compte_rendu = CompteRendu.objects.get(id=1)
        self.assertEqual(str(compte_rendu), "Compte Rendu - Consultation on 2020-01-01 - Motif: Test consultation - Auteur: user1 - Examen: Examen biologique - Consultation on 2020-01-01 - Motif: Test consultation - Parametres: Test parametres - Valeurs: Test valeurs")


class TestOrdonnanceModel(TestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username="user1", password="password")
        cls.user = User.objects.get(id=1)
        medecin = Medecin.objects.create(user=cls.user, nom="Dr. Pierre", prenom="Dupont", email="pierre.dupont@example.com")
        patient = Patient.objects.create(user=cls.user, num_securite_sociale="1234567890", nom="Pierre", prenom="Dupont", date_naissance="1990-01-01", adress="1 rue de la paix", telephone="0606060606", medecin_traitant_id=1, personne_contact="Jean Dupont")
        consultation = Consultation.objects.create(motif="Test consultation", date="2020-01-01", resume="Test resume", dossier_id=1, medecin_id=1)
        Ordonnance.objects.create(date="2020-01-01", duree="3 semaines", consultation_id=consultation.id, validated=False)

    def test_ordonnance_str(self):
        ordonnance = Ordonnance.objects.get(id=1)
        self.assertEqual(str(ordonnance), "Ordonnance - Consultation on 2020-01-01 - Motif: Test consultation - Date: 2020-01-01 - Duree: 3 semaines - Validee: False")


class TestMedicamentModel(TestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username="user1", password="password")
        cls.user = User.objects.get(id=1)
        medicament = Medicament.objects.create(nom="Test medicament", dosage="10mg", voie_administration="Orale")
        cls.medicament = medicament

    def test_medicament_str(self):
        self.assertEqual(str(self.medicament), "Test medicament - Dosage: 10mg - Voie administration: Orale")


class TestOrdonnanceMedicamentModel(TestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username="user1", password="password")
        cls.user = User.objects.get(id=1)
        medicament = Medicament.objects.create(nom="Test medicament", dosage="10mg", voie_administration="Orale")
        ordonnance = Ordonnance.objects.create(date="2020-01-01", duree="3 semaines", consultation_id=1, validated=False)
        OrdonnanceMedicament.objects.create(ordonnance_id=ordonnance.id, medicament_id=medicament.id)

    def test_ordonnance_medicament_str(self):
        ordonnance_medicament = OrdonnanceMedicament.objects.get(id=1)
        self.assertEqual(str(ordonnance_medicament), "OrdonnanceMedicament - Ordonnance on 2020-01-01 - Motif: Test consultation - Date: 2020-01-01 - Duree: 3 semaines - Validee: False - Medicament: Test medicament - Dosage: 10mg - Voie administration: Orale")


class TestDossierPatientModel(TestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username="user1", password="password")
        cls.user = User.objects.get(id=1)
        dossier = DossierPatient.objects.create(date_creation="2020-01-01", num_securite_sociale="1234567890")
        cls.dossier = dossier

    def test_dossier_patient_str(self):
        self.assertEqual(str(self.dossier), "Dossier Patient - Numero de securite sociale: 1234567890 - Date de creation: 2020-01-01")


class TestAntecedentModel(TestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username="user1", password="password")
        cls.user = User.objects.get(id=1)
        dossier = DossierPatient.objects.create(date_creation="2020-01-01", num_securite_sociale="1234567890")
        antecedent = Antecedent.objects.create(type="Test type", description="Test description", date_declaration="2020-01-01", dossier_id=dossier.id)
        cls.antecedent = antecedent

    def test_antecedent_str(self):
        self.assertEqual(str(self.antecedent), "Antecedent - Type: Test type - Description: Test description - Date de declaration: 2020-01-01 - Dossier: Dossier Patient - Numero de securite sociale: 1234567890 - Date de creation: 2020-01-01")


class TestCertificatMedicalModel(TestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username="user1", password="password")
        cls.user = User.objects.get(id=1)
        dossier = DossierPatient.objects.create(date_creation="2020-01-01", num_securite_sociale="1234567890")
        certificat = CertificatMedical.objects.create(date_emission="2020-01-01", motif="Test motif", date_arret="3 semaines", dossier_id=dossier.id)
        cls.certificat = certificat

    def test_certificat_medical_str(self):
        self.assertEqual(str(self.certificat), "Certificat Medical - Date d'emission: 2020-01-01 - Motif: Test motif - Date d'arret: 3 semaines - Dossier: Dossier Patient - Numero de securite sociale: 1234567890 - Date de creation: 2020-01-01")


class TestSoinModel(TestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username="user1", password="password")
        cls.user = User.objects.get(id=1)
        dossier = DossierPatient.objects.create(date_creation="2020-01-01", num_securite_sociale="1234567890")
        soin = Soin.objects.create(date="2020-01-01", type="Test type", description="Test description", infirmier_id=1, dossier_id=dossier.id, observation="Test observation")
        cls.soin = soin

    def test_soin_str(self):
        self.assertEqual(str(self.soin), "Soin - Date: 2020-01-01 - Type: Test type - Description: Test description - Infirmier: user1 - Dossier: Dossier Patient - Numero de securite sociale: 1234567890 - Date de creation: 2020-01-01 - Observation: Test observation")


class TestBilanBiologiqueModel(TestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username="user1", password="password")
        cls.user = User.objects.get(id=1)
        medecin = Medecin.objects.create(user=cls.user, nom="Dr. Pierre", prenom="Dupont", email="pierre.dupont@example.com")
        patient = Patient.objects.create(user=cls.user, num_securite_sociale="1234567890", nom="Pierre", prenom="Dupont", date_naissance="1990-01-01", adress="1 rue de la paix", telephone="0606060606", medecin_traitant_id=1, personne_contact="Jean Dupont")
        consultation = Consultation.objects.create(motif="Test consultation", date="2020-01-01", resume="Test resume", dossier_id=1, medecin_id=1)






