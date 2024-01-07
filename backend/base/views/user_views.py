from rest_framework import generics
from base.serializers import MyTokenObtainPairSerializer, UserSerializer, RegistrationSerializer, UserSerializerWithToken
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@permission_classes([IsAuthenticated])
class GetUserProfile(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

@permission_classes([IsAuthenticated])
class UpdateUserProfile(generics.UpdateAPIView):
    serializer_class = UserSerializerWithToken
    def get_object(self):
        return self.request.user
    def perform_update(self, serializer):
        serializer.save()
        password = self.request.data.get('password')
        if password:
            user = self.get_object()
            user.set_password(password)
            user.save()

@permission_classes([IsAuthenticated, IsAdminUser])
class GetAllUsers(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializedData = serializer.save(serializer.validated_data)
        
        data = {
            'response': 'Successfully registered',
            'username': serializedData['username'],
            'email': serializedData['email'],
            'token': serializedData.get('token')
        }
        return Response(data)
