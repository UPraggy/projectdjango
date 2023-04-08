# Generated by Django 4.0.5 on 2022-07-22 08:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('smtp_server', models.CharField(blank=True, max_length=100, null=True)),
                ('port_server', models.CharField(blank=True, max_length=100, null=True)),
                ('host_user', models.CharField(blank=True, max_length=100, null=True)),
                ('host_password', models.CharField(blank=True, max_length=100, null=True)),
                ('auto_password', models.BooleanField(blank=True, null=True)),
                ('require_tls', models.BooleanField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
