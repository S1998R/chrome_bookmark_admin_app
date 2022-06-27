from .models import Category, BookMark
from django import forms


class CategoryForm(forms.ModelForm):

    category_name = forms.CharField(label='', widget=forms.TextInput(attrs={'placeholder': '新規カテゴリ名'}))

    class Meta:
        model = Category
        fields = ('category_name',)


class PageMemoForm(forms.ModelForm):

    memo = forms.CharField(label='', widget=forms.Textarea(attrs={'placeholder': 'メモ', 'rows': 6, 'cols': 60}),)

    class Meta:
        model = BookMark
        fields = ('memo',)


