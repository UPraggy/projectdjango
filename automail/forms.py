from django import forms
from .models import Automail

class AutomailForm(forms.ModelForm):
	password = forms.CharField(max_length=50)
	save_or_submit = forms.CharField(max_length=7)
	class Meta:
		model = Automail
		fields = [
		'user',
		'to_email',
		'subject',
		'content']