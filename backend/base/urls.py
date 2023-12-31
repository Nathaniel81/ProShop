from django.urls import path
from . import views

urlpatterns = [
	path('get-routes/', views.getRoutes, name='routes'),
	path('products-list/', views.ProductList.as_view(), name='product-lists')
]
