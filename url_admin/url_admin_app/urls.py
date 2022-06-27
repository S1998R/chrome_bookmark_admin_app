from django.urls import path

from . import views

app_name = 'url_admin_app'
urlpatterns = [
    path('', views.TopView.as_view(), name='top'),
    path('category_delete/', views.CategoryDelete.as_view(), name='category_delete'),
    path('bookmark_delete/', views.BookMarkDelete.as_view(), name='bookmark_delete'),
    path('category_save/', views.CategorySave.as_view(), name='category_save'),
    path('category_display/', views.CategoryDisplay.as_view(), name='category_display'),
    path('page_memo/', views.PageMemo.as_view(), name='page_memo'),
    path('category_display_order/', views.CategoryDisplayOrder.as_view(), name='category_display_order'),
    path('category_order_session_change/', views.CategoryOrderSessionChange.as_view(), name='category_order_session_change'),
]

