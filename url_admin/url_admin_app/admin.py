from django.contrib import admin

from .models import Category, BookMark


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name',)


admin.site.register(Category, CategoryAdmin)
admin.site.register(BookMark)


