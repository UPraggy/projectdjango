# Generated by Django 4.0.5 on 2022-09-19 11:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chess', '0003_match_winner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='match',
            name='winner',
        ),
    ]
