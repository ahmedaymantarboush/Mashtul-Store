# Generated by Django 3.2.7 on 2021-09-12 23:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0017_product_finalprice'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='isPremium',
            field=models.BooleanField(default=False),
        ),
    ]