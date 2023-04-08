from django import template

register = template.Library()

@register.filter(name='mail_order')
def mail_order(value):
	if(((value-1)%2) == 0):
		return True
	else:
		return False

@register.filter(name='canEditEmail')
def canEditEmail(value,arg):
	temp = arg.split("_")[0]
	print(temp)
	if(str(value) == temp):
		return True
	else:
		return False

@register.filter(name='dateFormating')
def dateFormating(value):
	day = value.day
	month = value.month
	if (day < 10):
		day = '0'+ str(day)
	if (month < 10):
		month = '0'+ str(month)
	return f'{day}/{month}/{value.year}'


