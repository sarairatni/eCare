# Generated by Django 5.1.4 on 2025-01-03 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_consultation_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='consultation',
            name='date',
            field=models.TextField(),
        ),
    ]
