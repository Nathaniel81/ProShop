from django.http import JsonResponse
from .models import Product
from rest_framework import generics
from .serializers import ProductSerializer, MyTokenObtainPairSerializer
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

def getRoutes(request):
    routes = [
	]
    
    return JsonResponse(routes, safe=False)

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = '_id'

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
