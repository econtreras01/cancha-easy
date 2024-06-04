from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .models import Reservation
from .serializers import ReservationSerializer, UserSerializer

class Usercreateview(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

class ReservationcreateView(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ReservationSerializer

    def get_queryset(self):
        return Reservation.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ReservationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ReservationSerializer

    def get_queryset(self):
        return Reservation.objects.filter(user=self.request.user)