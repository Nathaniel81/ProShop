from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework import generics
from .serializers import ProductSerializers
from rest_framework.decorators import api_view
from rest_framework.response import Response


def getRoutes(request):
    routes = [
	]
    
    return JsonResponse(routes, safe=False)

class ProductList(generics.ListAPIView):
    queryset = products
    serializer_class = ProductSerializers

class ProductDetail(generics.RetrieveAPIView):
    queryset = products
    serializer_class = ProductSerializers
    lookup_field = '_id'
    def get_queryset(self):
        return products