from django.urls import path
from base.views import product_views as views


urlpatterns = [
	path('', views.ProductList.as_view(), name='products'),
  	path('create/', views.CreateProductView.as_view(), name="product-create"),
	path('detail/<str:_id>/', views.ProductDetail.as_view(), name='product-detail'),
 
	path('delete/<str:pk>/', views.DeleteProductView.as_view(), name="product-delete"),
	path('update/<str:pk>/', views.UpdateProductView.as_view(), name="product-update"),

	path('upload/', views.UploadImageView.as_view(), name="image-upload"),
	# path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
	path('<str:pk>/reviews/', views.CreateProductReviewView.as_view(), name="create-review"),
	 path('top/', views.getTopProducts, name='top-products'),

]
