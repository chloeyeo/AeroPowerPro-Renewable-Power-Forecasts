# Generated by Django 4.1.3 on 2023-01-13 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_db', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='user',
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='email',
            field=models.CharField(default='asd@abdcasdasd.asd', max_length=100, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
