# Generated by Django 3.2 on 2021-04-11 21:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0010_auto_20210408_0432'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='bookers',
        ),
        migrations.RemoveField(
            model_name='product',
            name='lovers',
        ),
    ]
