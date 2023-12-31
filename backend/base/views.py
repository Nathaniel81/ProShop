from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.generics import ListAPIView
from .serializers import ProductSerializers

def getRoutes(request):
    routes = [
	]
    
    return JsonResponse(routes, safe=False)
    
class ProductList(ListAPIView):
    queryset = products
    serializer_class = ProductSerializers
    