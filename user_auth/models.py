from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Account(models.Model):
	CONFIG_CHOICES = (
        ("configure", "Configure Send by my e-mail"),
        ("forward", "Forward to my email")
    )

	user = models.OneToOneField(User, on_delete=models.CASCADE)
	config_mail = models.TextField(max_length=100, choices=CONFIG_CHOICES, blank=True, null=True)
	smtp_server = models.CharField(max_length=100, blank=True, null=True)
	smtp_server = models.CharField(max_length=100, blank=True, null=True)
	port_server = models.CharField(max_length=100, blank=True, null=True)
	host_user = models.CharField(max_length=100, blank=True, null=True)
	host_password = models.CharField(max_length=100, blank=True, null=True)
	auto_password = models.BooleanField(blank=True, null=True)
	require_tls = models.BooleanField(blank=True, null=True)

	def __str__(self):
		return self.user.username