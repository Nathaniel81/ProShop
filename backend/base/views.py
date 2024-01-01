from django.shortcuts import render
from django.http import JsonResponse
from .models import Product
from rest_framework import generics
from .serializers import ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


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