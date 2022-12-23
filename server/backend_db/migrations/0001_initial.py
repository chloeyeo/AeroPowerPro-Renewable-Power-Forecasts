# Generated by Django 4.1.3 on 2022-11-30 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ActualProduceElectricity',
            fields=[
                ('data_id', models.IntegerField(auto_created=True, primary_key=True, serialize=False, unique=True)),
                ('time_series_id', models.CharField(max_length=255)),
                ('registed_resource_eic_code', models.CharField(max_length=255)),
                ('bm_unit_id', models.CharField(max_length=255)),
                ('ngc_bm_unit_id', models.CharField(max_length=255)),
                ('psr_type', models.CharField(max_length=255)),
                ('market_generation_unit_eic_code', models.CharField(max_length=255)),
                ('market_generation_bmu_id', models.CharField(max_length=255)),
                ('market_generation_ngc_bmu_id', models.CharField(max_length=255)),
                ('settlement_date', models.DateField()),
                ('period', models.IntegerField()),
                ('quantity', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='HistoricWind',
            fields=[
                ('wind_data_id', models.IntegerField(auto_created=True, primary_key=True, serialize=False, unique=True)),
                ('height_above_ground', models.IntegerField()),
                ('date_val', models.DateTimeField()),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('u_comp', models.FloatField()),
                ('v_comp', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='PowerForecast',
            fields=[
                ('power_forecast_id', models.IntegerField(auto_created=True, primary_key=True, serialize=False, unique=True)),
                ('date_val', models.DateTimeField()),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('power_forecast', models.FloatField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=100, null=True, unique=True)),
                ('password', models.CharField(max_length=64, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='WeatherForecast',
            fields=[
                ('forecast_data_id', models.IntegerField(auto_created=True, primary_key=True, serialize=False, unique=True)),
                ('date_val', models.DateTimeField()),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('temperature_2m', models.FloatField()),
                ('surface_pressure', models.FloatField()),
                ('windspeed_10m', models.FloatField()),
                ('windspeed_80m', models.FloatField()),
            ],
        ),
    ]
