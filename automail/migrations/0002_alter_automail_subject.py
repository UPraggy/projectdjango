# Generated by Django 4.0.5 on 2022-07-23 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('automail', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='automail',
            name='subject',
            field=models.CharField(max_length=50),
        ),
    ]