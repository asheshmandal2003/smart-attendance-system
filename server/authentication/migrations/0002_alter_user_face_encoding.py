# Generated by Django 5.0.1 on 2024-01-20 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='face_encoding',
            field=models.CharField(blank=True, null=True),
        ),
    ]