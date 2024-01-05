from django.http import JsonResponse
from base.models import Product
from rest_framework import generics
from base.serializers import ProductSerializer
# from django.contrib.auth.models import User
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from rest_framework.decorators import permission_classes


class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = '_id'
