from rest_framework import serializers


class ProductSerializers(serializers.Serializer):
    _id = serializers.CharField(max_length=10)
    name = serializers.CharField(max_length=100)
    image = serializers.CharField(max_length=255)
    description = serializers.CharField()
    brand = serializers.CharField(max_length=50)
    category = serializers.CharField(max_length=50)
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    countInStock = serializers.IntegerField()
    rating = serializers.FloatField()
    numReviews = serializers.IntegerField()
