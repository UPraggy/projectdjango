from django.contrib import admin

# Register your models here.
from .models import Account
from chat.models import AccountChat
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin


class AccountInline(admin.StackedInline):
	model = Account
	can_delete = False
	verbose_name_plural = 'Accounts'

class AccountChatInline(admin.StackedInline):
	model = AccountChat
	can_delete = False
	verbose_name_plural = 'AccountsChat'

class CustomizedUserAdmin(UserAdmin):
	inlines = (AccountInline, AccountChatInline, )


admin.site.unregister(User)
admin.site.register(User, CustomizedUserAdmin)
#admin.site.register(Account)
