# Generated by Django 3.2 on 2021-04-08 02:57

from django.db import migrations, models
import userProfile.models


class Migration(migrations.Migration):

    dependencies = [
        ('userProfile', '0010_alter_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='/Users/default.jpg', max_length=1000, upload_to=userProfile.models.uploadTo),
        ),
    ]