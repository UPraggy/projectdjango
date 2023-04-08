from django import template

register = template.Library()

@register.filter(name='card_order')
def card_order(value):
	if(((value-1)%2) == 0):
		return True
	else:
		return False

@register.filter(name='canEditRoom')
def canEditRoom(value,arg):
	temp = arg.split("_")[0]
	if(str(value) == temp):
		return True
	else:
		return False