from django.contrib.auth.models import User
from app.models import Medecin  # Replace `your_app` with your app's name

# Define doctors to be created
doctors_data = [
    {'username': 'doctor1', 'email': 'doctor1@example.com', 'password': 'password123', 'nom': 'Doe', 'prenom': 'John'},
    {'username': 'doctor2', 'email': 'doctor2@example.com', 'password': 'password123', 'nom': 'Smith', 'prenom': 'Jane'},
    {'username': 'doctor3', 'email': 'doctor3@example.com', 'password': 'password123', 'nom': 'Brown', 'prenom': 'Chris'},
]

# Create users and associate them with doctors
for doctor in doctors_data:
    user = User.objects.create_user(username=doctor['username'], email=doctor['email'], password=doctor['password'])
    Medecin.objects.create(user=user, nom=doctor['nom'], prenom=doctor['prenom'], email=doctor['email'])

print("Doctors created successfully!")
