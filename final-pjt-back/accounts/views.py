
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
# from rest_framework.decorators import permission_classes
# from rest_framework.permissions import IsAuthenticatedOrReadOnly

# from rest_framework import status
# from django.shortcuts import get_object_or_404, get_list_or_404
# from .serializers import Userserializer

# from django.contrib.auth import get_user_model

# def pofile(request, username):
#     User = get_user_model()
#     person = User.objects.get(username=username)
#     serializer = Userserializer(person)
#     return Response(serializer.data)