from django.urls import path
from base.views import order_views as views


urlpatterns = [

    # path('', views.getOrders, name='orders'),
    path('add/', views.AddOrderItemsView.as_view(), name='orders-add'),
    # path('myorders/', views.getMyOrders, name='myorders'),

    # path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),

    path('<str:pk>/', views.GetOrderView.as_view(), name='user-order'),
    # path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]
