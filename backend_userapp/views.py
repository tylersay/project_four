from django.contrib.auth import authenticate
from django.http.response import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from rest_framework.decorators import permission_classes
from .models import Ticker, CustomUser
from django.views import generic, View
# Create your views here.
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import  UserSerializer, TickersSerializer
import json
from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.core.serializers import serialize



class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                jsonUser = serializer.data
                return Response(jsonUser, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TickerView(View):
    def get(self, request):

        allTickers = Ticker.objects.all()
        serialized = serialize("json", allTickers)
        finalData = json.loads(serialized)
        return JsonResponse(finalData, safe=False)

