from django import forms

from .models import Room


class RoomForm(forms.ModelForm):
	name_authorized = forms.CharField(max_length=40)
	class Meta:
		model = Room
		fields = [
			'name',
			'room_picture',
			'slug',
			'room_type',
			'authorized_users',
		]