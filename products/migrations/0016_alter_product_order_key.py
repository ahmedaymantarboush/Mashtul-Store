# Generated by Django 3.2.3 on 2021-05-27 02:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0015_auto_20210527_0417'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='order_key',
            field=models.IntegerField(unique=True),
        ),
    ]
