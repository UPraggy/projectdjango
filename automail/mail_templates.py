import os 

def mail_templates_base(type):
	dir_path = os.path.dirname(os.path.realpath(__file__)).replace('\\','/') 
	dir_path = f'{dir_path}/static/templates_mail'
	temp = open(f'{dir_path}/base.txt')
	base = temp.read()
	temp.close()

	
	templates_list = ['title','paragraph','spacer','divider','link','image','social_base','social','table','tableCol','tableRow']
	template = [x for x in range(0, len(templates_list))]
	for x in range(0, len(templates_list)):
		temp = open(f'{dir_path}/{templates_list[x]}.txt')
		template[x] = temp.read()
		temp.close()
	return base,template