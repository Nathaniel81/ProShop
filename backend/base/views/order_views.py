from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from base.models import Order, OrderItem, Product, ShippingAddress
from base.serializers import OrderSerializer

class AddOrderItemsView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        data = request.data

        orderItems = data.get('orderItems', [])

        if not orderItems:
            return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
        
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )
        
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )

        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )
            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class GetOrderView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def get(self, request, *args, **kwargs):
        user = request.user
        try:
            instance = self.get_object()
            if user.is_staff or instance.user == user:
                serializer = self.get_serializer(instance)
                return Response(serializer.data)
            else:
                return Response({'detail': 'Not authorized to view this order'},
                                status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)