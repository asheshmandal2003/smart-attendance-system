# Generated by Django 5.0.1 on 2024-01-20 20:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_remove_user_is_active_remove_user_is_staff'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='face_encoding',
            new_name='img_path',
        ),
    ]
