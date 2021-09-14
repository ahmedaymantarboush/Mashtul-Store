# Generated by Django 3.2.7 on 2021-09-14 19:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contactUs', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='emails',
            old_name='mame',
            new_name='name',
        ),
        migrations.AlterField(
            model_name='emails',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL),
        ),
    ]