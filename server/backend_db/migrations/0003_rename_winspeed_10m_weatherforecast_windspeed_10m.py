# Generated by Django 4.1.3 on 2022-11-23 12:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend_db', '0002_weatherforecast'),
    ]

    operations = [
        migrations.RenameField(
            model_name='weatherforecast',
            old_name='winspeed_10m',
            new_name='windspeed_10m',
        ),
    ]
