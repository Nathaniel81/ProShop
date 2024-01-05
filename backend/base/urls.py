from django.urls import path
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )
from . import views

urlpatterns = [
    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('users/profile', views.GetUserProfile.as_view(), name='user-profile'),
	path('get-routes/', views.getRoutes, name='routes'),
	path('products', views.ProductList.as_view(), name='products'),
	path('product/<str:_id>/', views.ProductDetail.as_view(), name='product-detail')
]
