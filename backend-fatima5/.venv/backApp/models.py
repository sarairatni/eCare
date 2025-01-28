from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="patient",default=6)
    nss = models.BigIntegerField(primary_key=True,unique=True)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    date_naissance = models.DateField()
    adresse = models.CharField(max_length=200)
    num_telephone = models.BigIntegerField(unique=True,default="Unknown")
    mutuelle = models.IntegerField(default="Unknown")
    medecin_trataint = models.CharField( max_length=100,default="Unknown")
    num_personne_a_contacter = models.BigIntegerField(default="Unknown")
    sexe = models.CharField(max_length=1,choices=[("M","Masculin"),("F","Feminin")],default="M")
    class Meta:
        verbose_name = "Patient"
        verbose_name_plural = "Patients"
 
    def __str__(self):
        return f"Patient {self.nom}"
    @property
    def nss(self):
        return self._nss
    
    @nss.setter
    def nss(self, value):
        self._nss = value
    
    @property
    def nom(self):
        return self._nom
    
    @nom.setter
    def nom(self, value):
        self._nom = value
    
    @property
    def prenom(self):
        return self._prenom
    
    @prenom.setter
    def prenom(self, value):
        self._prenom = value
    
    @property
    def date_naissance(self):
        return self._date_naissance
    
    @date_naissance.setter
    def date_naissance(self, value):
        self._date_naissance = value
    
    @property
    def adresse(self):
        return self._adresse
    
    @adresse.setter
    def adresse(self, value):
        self._adresse = value
    
    @property
    def num_telephone(self):
        return self._num_telephone
    
    @num_telephone.setter
    def num_telephone(self, value):
        self._num_telephone = value
    
    @property
    def mutuelle(self):
        return self._mutuelle
    
    @mutuelle.setter
    def mutuelle(self, value):
        self._mutuelle = value
    
    @property
    def medecin_trataint(self):
        return self._medecin_trataint
    
    @medecin_trataint.setter
    def medecin_trataint(self, value):
        self._medecin_trataint = value
    
    @property
    def num_personne_a_contacter(self):
        return self._num_personne_a_contacter
    
    @num_personne_a_contacter.setter
    def num_personne_a_contacter(self, value):
        self._num_personne_a_contacter = value
    
    @property
    def sexe(self):
        return self._sexe
    
    @sexe.setter
    def sexe(self, value):
        self._sexe = value
    



    
class DossierPatient(models.Model):
    numerodossier = models.BigAutoField(primary_key=True, default=0, unique=True)
    antecedents = models.ManyToManyField('Antecedent',related_name="dossiers",blank=True,default=0)
    consultations = models.ManyToManyField('Consultation',related_name="dossiers",blank=True,default=0)
    certificats_medicaux = models.ManyToManyField('CertificatMedical',related_name="dossiers",blank=True,default=0)

    class Meta: 
        verbose_name = "Dossier Patient"
        verbose_name_plural = "Dossiers Patients"

    def ajouter_consultation(self,consultation):
        self.consultations.add(consultation)

    def obtenir_consultation(self,critere):
        return self.consultations.filter(resume_icontains=critere)
    
    def ajouter_antecedent(self,antecedent):
        self.antecedents.add(antecedent)

    def obtenir_antecedent(self,critere):
        return self.antecedents.filter(resume_icontains=critere)
    def ajouter_certificat_medical(self,certificat_medical):
        self.certificats_medicaux.add(certificat_medical)

    def obtenir_certificat_medical(self,critere):
        return self.certificats_medicaux.filter(motif_icontains=critere)
    @property
    def numero_dossier(self):
        return self._numero_dossier
    
    @numero_dossier.setter
    def numero_dossier(self, value):
        self._numero_dossier = value
    def __str__(self):
        return f"Dossier {self.numero_dossier}"
    
class Antecedent(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=1000)
    date = models.DateField()
    dossier_patient = models.ForeignKey(DossierPatient, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Antecedent"
        verbose_name_plural = "Antecedents"

    def __str__(self):
        return f"{self.date}-{self.description[:50]}"
     
    @property
    def description(self):
        return self._description
    
    @description.setter
    def description(self, value):
        self._description = value
    
    @property
    def date(self):
        return self._date
    
    @date.setter
    def date(self, value):
        self._date = value
    
    @property
    def dossier_patient(self):
        return self._dossier_patient
    
    @dossier_patient.setter
    def dossier_patient(self, value):
        self._dossier_patient = value


class Consultation(models.Model):
    id = models.AutoField(primary_key=True)
    resume = models.CharField(max_length=100)
    date = models.DateField()
    prescriptions = models.ManyToManyField('Prescription',related_name="consultations",blank=True)
    examens = models.ManyToManyField('Examen',related_name="consultations", blank=True)
    dossier_patient = models.ForeignKey(DossierPatient, on_delete=models.CASCADE, blank=True)   


    class Meta: 
        verbose_name = "Consultation"
        verbose_name_plural = "Consultations"

    def ajouter_Presciption(self,presciption):
        self.presciptions.add(presciption)

    def obtenir_Presciption(self,critere):
        return self.presciptions.filter(resume_icontains=critere)
    
    def ajouter_examen(self,examen):
        self.examens.add(examen)

    def obtenir_examen(self,critere):
        return self.examens.filter(resume_icontains=critere)
    @property
    def resume(self):
        return self._resume
    
    @resume.setter
    def resume(self, value):
        self._resume = value
    
    @property
    def date(self):
        return self._date
    
    @date.setter
    def date(self, value):
        self._date = value

    @property
    def prescriptions(self):
        return self._prescriptions
    
    @prescriptions.setter
    def prescriptions(self, value):
        self._prescriptions = value

    @property
    def examens(self):
        return self._examens
    
    @examens.setter
    def examens(self, value):
        self._examens = value
    
    @property
    def dossier_patient(self):
        return self._dossier_patient
    
    @dossier_patient.setter
    def dossier_patient(self, value):
        self._dossier_patient = value
    def __str__(self):
        return f"Consultation du {self.date}"

class Prescription(models.Model):
    id = models.AutoField(primary_key=True)
    medicament = models.CharField(max_length=200)
    dose = models.CharField(max_length=100)
    duree = models.CharField(max_length=50)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE, default=None)

    class Meta:
        verbose_name = "Prescription"
        verbose_name_plural = "Prescriptions"
    @property
    def medicament(self):
        return self._medicament
    
    @medicament.setter
    def medicament(self, value):
        self._medicament = value
    
    @property
    def dose(self):
        return self._dose
    
    @dose.setter
    def dose(self, value):
        self._dose = value
    
    @property
    def duree(self):
        return self._duree
    
    @duree.setter
    def duree(self, value):
        self._duree = value
    def __str__(self):
        return f"{self.medicament} - {self.dose}"  

class Examen(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=100)
    resultat = models.CharField(max_length=100)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE, related_name="examens")

    class Meta:
        verbose_name = "Examen"
        verbose_name_plural = "Examens"

    def generer_image(self):
        pass
    @property
    def type(self):
        return self._type
    
    @type.setter
    def type(self, value):
        self._type = value

    @property
    def resultat(self):
        return self._resultat
    
    @resultat.setter
    def resultat(self, value):
        self._resultat = value

    @property
    def consultation(self):
        return self._consultation
    
    @consultation.setter
    def consultation(self, value):
        self._consultation = value
    def __str__(self):
        return f"Examen id {self.id}"
    class Meta:
        verbose_name = "Examen"
        verbose_name_plural = "Examens"

    def generer_image(self):
        
        pass
     
    def __str__(self):
        return f"Examen id {self.id}"



class CertificatMedical(models.Model):
    id = models.AutoField(primary_key=True)
    date_emission = models.DateField()
    motif = models.CharField(max_length=200)
    duree_arret= models.CharField(max_length=50)
    dossier_patient = models.ForeignKey(DossierPatient, on_delete=models.CASCADE)
    class Meta:
        verbose_name = "Certificat Medical"
        verbose_name_plural = "Certificats Medicals"
    @property
    def date_emission(self):
        return self._date_emission
    
    @date_emission.setter
    def date_emission(self, value):
        self._date_emission = value

    @property
    def motif(self):
        return self._motif
    
    @motif.setter
    def motif(self, value):
        self._motif = value

    @property
    def duree_arret(self):
        return self._duree_arret
    
    @duree_arret.setter
    def duree_arret(self, value):
        self._duree_arret = value
    def __str__(self):
        return f"Certificat Medical du {self.date_emission}"
    
class Infermier(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="infermier",default=2)
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Infermier"
        verbose_name_plural = "Infermiers"

    def saisir_observations(self, nss: str):
        
        pass
    @property
    def nom(self):
        return self._nom
    
    @nom.setter
    def nom(self, value):
        self._nom = value

    @property
    def prenom(self):
        return self._prenom
    
    @prenom.setter
    def prenom(self, value):
        self._prenom = value
    def __str__(self):
        return f"Infermier {self.nom} - {self.prenom}"
    
class Medecin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="medecin",null=False, default=1)
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Medecin"
        verbose_name_plural = "Medecins"

    def rechercher_consultations(self, nss: str):
        
        pass

    def editer_ordonance(self, prescription):
        
        pass

    def prescrire_examen(self, examen):
        
        pass
    @property
    def nom(self):
        return self._nom

    @nom.setter
    def nom(self, value):
        self._nom = value

    @property
    def prenom(self):
        return self._prenom

    @prenom.setter
    def prenom(self, value):
        self._prenom = value
    def __str__(self):
        return f"Dr {self.nom} - {self.prenom}"
    
class Pharmacien(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="pharmacien",default=3)
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Pharmacien"
        verbose_name_plural = "Pharmaciens"

    def valider_ordonance(self, prescription):
        
        pass
    @property
    def nom(self):
        return self._nom
    
    @nom.setter
    def nom(self, value):
        self._nom = value

    @property
    def prenom(self):
        return self._prenom
    
    @prenom.setter
    def prenom(self, value):
        self._prenom = value
    def __str__(self):
        return f"Pharmacien {self.nom} - {self.prenom}"
    
class Radiologue(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="radiologue",default=4)
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Radiologue"
        verbose_name_plural = "Radiologues"

    def uploader_image_medicale(self):
        
        pass
    @property
    def nom(self):
        return self._nom

    @nom.setter
    def nom(self, value):
        self._nom = value

    @property
    def prenom(self):
        return self._prenom

    @prenom.setter
    def prenom(self, value):
        self._prenom = value
    def __str__(self):
        return f"Radiologue {self.nom} - {self.prenom}"
    
class Technicien(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="technicien",default=5)
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    @property
    def nom(self):
        return self._nom
    
    @nom.setter
    def nom(self, value):
        self._nom = value

    @property
    def prenom(self):
        return self._prenom
    
    @prenom.setter
    def prenom(self, value):
        self._prenom = value
    class Meta:
        verbose_name = "Technicien"
        verbose_name_plural = "Techniciens"

    def analyser_resultats_examen(self, examen):
        
        pass

    def __str__(self):
        return f"Technicien {self.nom} - {self.prenom}"
    
class SGPH(models.Model):
    id = models.AutoField(primary_key=True)
    def __str__(self):
        return self.id