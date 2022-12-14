# Generated by Django 4.0.5 on 2022-08-26 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_auth', '0003_alter_account_config_mail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='config_mail',
            field=models.TextField(blank=True, choices=[('default', 'Select one configuration to use e-mail customize app'), ('configure', 'Configure Send by my e-mail'), ('forward', 'Forward to my email')], max_length=100, null=True),
        ),
    ]
