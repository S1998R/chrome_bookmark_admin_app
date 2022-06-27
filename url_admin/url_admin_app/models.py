from django.db import models


class Category(models.Model):
    category_name = models.CharField(verbose_name='カテゴリ', max_length=100000)
    delete = models.BooleanField(verbose_name='削除したか否か', max_length=100000, null=True, default=False)
    display = models.BooleanField(verbose_name='表示するか否か', max_length=100000, null=True, default=False)
    display_order_number = models.IntegerField(verbose_name='カテゴリの表示順番号', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)  # トークルームが生成した時刻
    updated_at = models.DateTimeField(auto_now=True, null=True)  # 編集・更新した時刻  .save()でしか自動更新されない


class BookMark(models.Model):
    category = models.ForeignKey(Category, verbose_name='カテゴリ', max_length=100000, on_delete=models.CASCADE, null=True)
    page_title = models.CharField(verbose_name='ページタイトル', max_length=100000)
    url = models.CharField(verbose_name='ページのurl', max_length=100000)
    favicon_url = models.CharField(verbose_name='ページのファビコンのurl', max_length=100000, null=True)
    display = models.BooleanField(verbose_name='表示するか否か', max_length=100000, null=True, default=False)
    memo = models.CharField(verbose_name='ページについてのメモ', max_length=100000, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)  # トークルームが生成した時刻
    updated_at = models.DateTimeField(auto_now=True, null=True)  # 編集・更新した時刻  .save()でしか自動更新されない
