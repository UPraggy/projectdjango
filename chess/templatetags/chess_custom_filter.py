from django import template

register = template.Library()

@register.filter(name='list_function')
def list_function(value, arg):
	arg = arg.split(" ")
	if (arg[1] == "normal"):
		iterator = [x for x in range(0, int(arg[0]))]
	else:
		iterator = [x for x in range(int(arg[0]), int(arg[2]))]
	return iterator