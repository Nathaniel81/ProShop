from django.urls import path
from base.views import product_views as views


urlpatterns = [
	path('', views.ProductList.as_view(), name='products'),
	path('detail/<str:_id>/', views.ProductDetail.as_view(), name='product-detail')
]