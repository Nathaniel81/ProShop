from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.models import Product
from base.serializers import ProductSerializer
# from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import permission_classes, api_view


class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = '_id'

class DeleteProductView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser, IsAuthenticated]
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response('Product deleted')
    
class CreateProductView(generics.CreateAPIView):
    # queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            name='Sample Name',
            price=0,
            brand='Sample Brand',
            countInStock=0,
            category='Sample Category',
            description=''
        )

# @api_view(['PUT'])
# @permission_classes([IsAdminUser])
# def updateProduct(request, pk):
#     data = request.data
#     product = Product.objects.get(_id=pk)

#     product.name = data['name']
#     product.price = data['price']
#     product.brand = data['brand']
#     product.countInStock = data['countInStock']
#     product.category = data['category']
#     product.description = data['description']

#     product.save()

#     serializer = ProductSerializer(product, many=False)
#     return Response(serializer.data)

class UpdateProductView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    # def update(self, request, *args, **kwargs):
    #     data = request.data
    #     product = self.get_object()
    #     product.name = data.get('name', product.name)
    #     product.price = data.get('price', product.price)
    #     product.brand = data.get('brand', product.brand)
    #     product.countInStock = data.get('countInStock', product.countInStock)
    #     product.category = data.get('category', product.category)
    #     product.description = data.get('description', product.description)

    #     product.save()

    #     serializer = self.get_serializer(product)
    #     return self.get_response(serializer.data)

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')