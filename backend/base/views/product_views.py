from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import permission_classes, api_view
from base.models import Product, Review
from base.serializers import ProductSerializer
# from django.contrib.auth.models import User


class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    def get(self, request, *args, **kwargs):
        search_param = self.request.query_params.get('keyword', '')
        queryset = self.queryset.filter(name__icontains=search_param)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

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

class UploadImageView(generics.CreateAPIView):
    def create(self, request, *args, **kwargs):
        data = request.data
        product_id = data['product_id']
        
        try:
            product = Product.objects.get(_id=product_id)
        except Product.DoesNotExist:
            return Response({'detail': 'Product not found'}, status=404)

        product.image = request.FILES.get('image')
        product.save()

        return Response('Image was uploaded')

class CreateProductReviewView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    def create(self, request, *args, **kwargs):
        user = request.user
        product = self.get_object()
        data = request.data
        
        already_exists = product.review_set.filter(user=user).exists()
        if already_exists:
            content = {'detail': 'Product already reviewed'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        elif data['rating'] == 0:
            content = {'detail': 'Please select a rating'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        else:
            review = Review.objects.create(
                user=user,
                product=product,
                name=user.first_name,
                rating=data['rating'],
                comment=data['comment'],
            )

            reviews = product.review_set.all()
            product.numReviews = len(reviews)

            total = 0
            for i in reviews:
                total += i.rating

            product.rating = total / len(reviews)
            product.save()

            return Response('Review Added')
            

