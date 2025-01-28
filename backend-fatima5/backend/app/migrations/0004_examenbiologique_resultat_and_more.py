# Generated by Django 5.1.4 on 2025-01-04 05:05

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

   

    operations = [
        migrations.CreateModel(
            name='Examen',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=50)),
                ('date', models.DateField()),
                ('resultat', models.TextField()),
                ('consultation_id', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ExamenBiologique',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parametres', models.TextField()),
                ('valeurs', models.TextField()),
                ('graphique_tendance', models.TextField()),
                ('examen_id', models.CharField(max_length=50)),
                ('laborantin_id', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ExamenRadiologique',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_image', models.CharField(max_length=50)),
                ('fichier_image', models.TextField()),
                ('compte_rendu', models.TextField()),
                ('examen_id', models.CharField(max_length=50)),
                ('radiologue_id', models.CharField(max_length=50)),
            ],
        ),
    ]
