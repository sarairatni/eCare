
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_remove_ordonnance_duree'),
    ]

    operations = [
        migrations.CreateModel(
            name='BilanBiologique',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('consultation_id', models.CharField(max_length=50)),
                ('dossier_id', models.CharField(max_length=50)),
                ('date_creation', models.DateTimeField(auto_now_add=True)),
                ('observation', models.TextField(blank=True, null=True)),
                ('pression_arterielle', models.BooleanField(default=False)),
                ('glycemie', models.BooleanField(default=False)),
                ('cholestérol_total', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='BilanRadiologique',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('consultation_id', models.CharField(max_length=50)),
                ('dossier_id', models.CharField(max_length=50)),
                ('observation', models.TextField(blank=True, null=True)),
                ('date_creation', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='ordonnance',
            name='duree',
            field=models.CharField(default=1, max_length=50),
            preserve_default=False,
        ),
    ]
