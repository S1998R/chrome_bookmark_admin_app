from django.shortcuts import render
from django.views import generic
import json
import getpass
from .forms import CategoryForm
from django.shortcuts import redirect
from .models import Category, BookMark
from django.http import JsonResponse


CHROME_BOOKMARK_PATH = (
            '/Users/{username}/Library/Application Support/'
            'Google/Chrome/Default/Bookmarks'
        ).format(username=getpass.getuser())


def get_chrome_bookmark_data() -> dict:
    '''Get the json of user's Chrome bookmark.'''
    with open(CHROME_BOOKMARK_PATH) as f:
        return json.load(f)


class TopView(generic.TemplateView):
    template_name = 'top.html'

    def get(self, request, *args, **kwargs):
        # JSON 内のデータを取得する
        bookmark_data = get_chrome_bookmark_data()

        # ブックマークバーのデータを表示する
        bookmark_bar = bookmark_data['roots']['bookmark_bar']

        no_bookmark_list = []

        for entry in bookmark_bar['children']:
            if entry['type'] == 'folder':
                name = entry['name']

            else:
                name = entry['name']
                url = entry['url']
                favicon_url = 'https://www.google.com/s2/favicons?domain=' + str(url)
                child_list = [name, url, favicon_url]

                if not BookMark.objects.filter(url=url):  # ブックマークがまだ無い場合にリストに追加

                    no_bookmark_list.append(child_list)

        # カテゴリの登録されていないurlもno_bookmark_listに追加
        no_category_bookmark = BookMark.objects.filter(category=None)
        for item in no_category_bookmark:
            child_list = [item.page_title, item.url, item.favicon_url]
            no_bookmark_list.append(child_list)

        form = CategoryForm()

        categories = Category.objects.exclude(delete=True).order_by('display_order_number')

        category_bookmark_dic = {}
        for category in categories:
            bookmarks = BookMark.objects.filter(category=category).order_by('-pk')
            dic = {category: bookmarks}
            category_bookmark_dic.update(dic)

        first_display_categories = Category.objects.filter(display=True).exclude(delete=True).order_by('-pk')

        first_display_list = []
        for category in first_display_categories:
            first_display_list.append(category.category_name)

        self.request.session['scroll_position'] = None
        self.request.session['category_order_display'] = None

        if not self.request.session['scroll_position']:
            self.request.session['scroll_position'] = 0

        if not self.request.session['category_order_display'] == 'display':
            self.request.session['category_order_display'] = None

        params = {
            'no_bookmark_list': no_bookmark_list,
            'form': form,
            'categories': categories,
            'category_bookmark_dic': category_bookmark_dic,
            'first_display_list': first_display_list,
            'scroll_position': self.request.session['scroll_position'],
            'category_order_display': self.request.session['category_order_display'],
        }

        return render(self.request, 'top.html', params)

    def post(self, request, *args, **kwargs):
        category_name = self.request.POST.get('category_name')
        new_category = Category.objects.create(category_name=category_name)

        new_category.display_order_number = new_category.pk
        new_category.save()

        return redirect("url_admin_app:top")


class PageMemo(generic.TemplateView):

    def post(self, request, *args, **kwargs):
        bookmark_pk = self.request.POST.get('bookmark_pk')
        memo = self.request.POST.get('memo')
        scroll_position = self.request.POST.get('body_scroll_px')
        self.request.session['scroll_position'] = scroll_position
        bookmark = BookMark.objects.filter(pk=bookmark_pk).first()
        bookmark.memo = memo
        bookmark.save()

        return redirect("url_admin_app:top")


class CategoryDelete(generic.TemplateView):
    template_name = 'top.html'

    def post(self, request, *args, **kwargs):
        category_pk = self.request.POST.get('category_pk')
        category = Category.objects.filter(pk=category_pk).first()

        scroll_position = self.request.POST.get('body_scroll_px')
        self.request.session['scroll_position'] = scroll_position

        if category:
            category.delete = True
            category.save()

        return redirect("url_admin_app:top")


class BookMarkDelete(generic.TemplateView):
    template_name = 'top.html'

    def post(self, request, *args, **kwargs):
        bookmark_pk = self.request.POST.get('bookmark_pk')
        bookmark = BookMark.objects.filter(pk=bookmark_pk).first()
        bookmark.delete()

        scroll_position = self.request.POST.get('body_scroll_px')
        self.request.session['scroll_position'] = scroll_position

        return redirect("url_admin_app:top")


class CategorySave(generic.TemplateView):
    template_name = 'top.html'

    def post(self, request, *args, **kwargs):
        page_title = self.request.POST.get('page_title')
        if not page_title:
            return redirect("url_admin_app:top")

        url = self.request.POST.get('url')
        if not url:
            return redirect("url_admin_app:top")

        category_pk = self.request.POST.get('category_pk')
        if not category_pk:
            return redirect("url_admin_app:top")

        category = Category.objects.filter(pk=category_pk).exclude(delete=True).first()
        previous_category_pk = None
        previous_category_count = None
        if category:
            bookmark = BookMark.objects.filter(url=url).first()
            if bookmark:
                if bookmark.category:
                    previous_category_pk = bookmark.category.pk

                    bookmark.category = category
                    bookmark.save()

                    previous_category_count = BookMark.objects.filter(category=previous_category_pk).count()

                else:  # urlだけをフォームから登録していた場合（前のカテゴリが無い場合）
                    bookmark.category = category
                    bookmark.save()

            else:
                favicon_url = 'https://www.google.com/s2/favicons?domain=' + str(url)
                BookMark.objects.create(category=category, page_title=page_title, url=url, favicon_url=favicon_url)

        else:
            return redirect("url_admin_app:top")

        category_count = BookMark.objects.filter(category=category).count()

        return JsonResponse({'category_count': category_count, 'category_pk': category.pk, 'previous_category_pk': previous_category_pk, 'previous_category_count': previous_category_count})


class CategoryDisplay(generic.TemplateView):
    template_name = 'top.html'

    def post(self, request, *args, **kwargs):
        Category.objects.all().update(display=False)  # 一旦全てをnoneに

        category_array = self.request.POST.get('category_array')

        category_list = category_array.split(',')

        if 'not_category_name_div' in category_list:
            category_list.remove('not_category_name_div')  # 未分類を削除

        for category in category_list:
            category = Category.objects.filter(category_name=category)  # 同じ名前のカテゴリを全て取得

            for item in category:
                item.display = True
                item.save()

        return JsonResponse({'category_count': None})


class CategoryDisplayOrder(generic.TemplateView):
    template_name = 'top.html'

    def post(self, request, *args, **kwargs):

        category_pk_list = self.request.POST.get('category_pk_array')
        category_order_list = self.request.POST.get('category_order_array')

        category_pk_list = category_pk_list.split(',')  # このままだと文字列なのでリストに変換
        category_order_list = category_order_list.split(',')  # このままだと文字列なのでリストに変換

        for category_pk, category_order in zip(category_pk_list, category_order_list):
            category = Category.objects.filter(pk=category_pk).first()
            category.display_order_number = category_order
            category.save()

        self.request.session['category_order_display'] = 'display'

        return JsonResponse({'category_count': None})


class CategoryOrderSessionChange(generic.TemplateView):
    template_name = 'top.html'

    def post(self, request, *args, **kwargs):

        self.request.session['category_order_display'] = None

        return JsonResponse({'category_count': None})


