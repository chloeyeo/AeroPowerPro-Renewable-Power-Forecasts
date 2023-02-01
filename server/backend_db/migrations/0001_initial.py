# Generated by Django 4.1.3 on 2023-02-01 14:34

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
                ('email', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=16)),
                ('password', models.CharField(max_length=64, null=True)),
                ('first_name', models.CharField(max_length=50, null=True)),
                ('last_name', models.CharField(max_length=50, null=True)),
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
        migrations.CreateModel(
            name='WindFarmData',
            fields=[
                ('windfarm_data_id', models.IntegerField(auto_created=True, primary_key=True, serialize=False, unique=True)),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('hub_height', models.IntegerField(default=100)),
                ('number_of_turbines', models.IntegerField(blank=True, default=50)),
                ('turbine_capacity', models.FloatField(blank=True)),
                ('is_onshore', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='WindFarmDetailData',
            fields=[
                ('id', models.IntegerField(auto_created=True, primary_key=True, serialize=False, unique=True)),
                ('operator', models.CharField(max_length=200, null=True)),
                ('sitename', models.CharField(max_length=200, null=True)),
                ('is_onshore', models.BooleanField(default=True)),
                ('turbine_height', models.FloatField(blank=True, null=True)),
                ('number_of_turbines', models.IntegerField(blank=True, null=True)),
                ('turbine_capacity', models.FloatField(blank=True, null=True)),
                ('development_status', models.CharField(max_length=200, null=True)),
                ('x_coordinate', models.FloatField(blank=True, null=True)),
                ('y_coordinate', models.FloatField(blank=True, null=True)),
                ('longitude', models.FloatField(blank=True, null=True)),
                ('latitude', models.FloatField(blank=True, null=True)),
            ],
        ),
    ]
