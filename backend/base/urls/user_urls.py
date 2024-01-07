from django.urls import path
from base.views import user_views as views
    
urlpatterns = [
    path('', views.GetAllUsers.as_view(), name='users'),
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('register', views.RegistrationView.as_view(), name='register'),
    
    path('profile/', views.GetUserProfile.as_view(), name='user-profile'),
    path('update/', views.UpdateUserProfile.as_view(), name='update-profile'),
]
