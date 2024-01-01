from django.urls import path
from . import views

urlpatterns = [
	path('get-routes/', views.getRoutes, name='routes'),
	path('products', views.ProductList.as_view(), name='products'),
	path('product/<str:_id>/', views.ProductDetail.as_view(), name='product-detail')
]
