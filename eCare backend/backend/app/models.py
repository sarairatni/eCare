from django.db import models
from django.contrib.auth.models import User


class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  
    num_securite_sociale = models.CharField(max_length=50)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    date_naissance = models.DateField()
    adress = models.CharField(max_length=255)
    telephone = models.CharField(max_length=15)
    medecin_traitant = models.ForeignKey('Medecin', on_delete=models.CASCADE, related_name="patients_set")
    personne_contact = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nom} {self.prenom} - NSS: {self.num_securite_sociale}"


class Medecin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    patients = models.ManyToManyField(Patient, related_name="medecin_set")
    
    def __str__(self):
        return f"Dr. {self.nom} {self.prenom}"

class Pharmacien(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)

    def __str__(self):
        return f"Dr. {self.nom} {self.prenom}"


class Infirmier(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)

    def __str__(self):
        return f"{self.nom} {self.prenom}"


class Laborantin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) 
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)

    def __str__(self):
        return f"{self.nom} {self.prenom}"


class Radiologue(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)

    def __str__(self):
        return f"{self.nom} {self.prenom}"


class Consultation(models.Model):
    motif = models.CharField(max_length=255)
    date = models.DateField()
    resume = models.TextField()
    dossier_id = models.CharField(max_length=50)
    medecin_id = models.CharField(max_length=50)

    def __str__(self):
        return f"Consultation on {self.date} - Motif: {self.motif}"
    
class Examen(models.Model):
    examen_id = models.AutoField(primary_key=True, serialize=True)
    type = models.CharField(max_length=50)
    date = models.DateField()
    resultat = models.TextField()

    class Meta:
        abstract = True


class ExamenRadiologique(Examen):
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE, related_name="radiologiques")
    type_image = models.CharField(max_length=50)
    fichier_image = models.TextField()
    compte_rendu = models.TextField()
    radiologue = models.ForeignKey(Radiologue, on_delete=models.CASCADE, related_name="examens_radiologiques")


class ExamenBiologique(Examen):
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE, related_name="biologiques")
    parametres = models.TextField()
    valeurs = models.TextField()
    graphique_tendance = models.TextField()
    laborantin = models.ForeignKey(Laborantin, on_delete=models.CASCADE, related_name="examens_biologiques")

class CompteRendu(models.Model):
    date = models.DateField()
    contenu = models.TextField()
    auteur_id = models.CharField(max_length=50)  
    examen_id = models.CharField(max_length=50)


class Medicament(models.Model):
     nom = models.CharField(max_length=100)
     dosage = models.CharField(max_length=50)  
     voie_administration = models.CharField(max_length=50)

class OrdonnanceMedicament(models.Model):
     ordonnance_id = models.CharField(max_length=50)
     medicament_id = models.CharField(max_length=50)

class DossierPatient(models.Model):
    date_creation = models.DateField()
    num_securite_sociale = models.CharField(max_length=50)

class Antecedent(models.Model):
    type = models.CharField(max_length=100)  
    description = models.TextField()
    date_declaration = models.DateField()
    dossier_id = models.CharField(max_length=50)

class CertificatMedical(models.Model):
    date_emission = models.DateField()
    motif = models.CharField(max_length=255)
    date_arret = models.CharField(max_length=50)
    dossier_id = models.CharField(max_length=50)

class Soin(models.Model):
    date = models.DateField()
    type = models.TextField()  
    description = models.TextField()
    infirmier_id = models.CharField(max_length=50)
    dossier_id = models.CharField(max_length=50)  
    observation = models.TextField() 

class Ordonnance(models.Model):
    date = models.DateField()
    duree = models.CharField(max_length=50)
    consultation_id = models.CharField(max_length=50)
    validated = models.BooleanField(default=False)




# Create your models here.