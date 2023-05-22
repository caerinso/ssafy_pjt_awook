# from rest_framework import serializers
# from .models import User
# # from movies.serializers import MovieSerializer, CommentSerializer
# from dj_rest_auth.serializers import UserDetailsSerializer   


# # class CustomUserDetailsSerializer(UserDetailsSerializer): # dj_rest_auth.urls/user => user 정보 불러오는 걸 custom
    
# #     class followerSerializer(serializers.ModelSerializer):

# #         class Meta:
# #             model = User
# #             fields = '__all__'
    
# #     followers_count = serializers.IntegerField(source='followers.count')
# #     followers_info = followerSerializer(source="followers", many=True)

# #     class Meta(UserDetailsSerializer.Meta):
# #         fields = UserDetailsSerializer.Meta.fields + ('nickname', 'image', 'point', 'date_joined', 'followings', 'followers', 'followers_info', 'followers_count')


# # REST_AUTH_SERIALIZERS = { 
# #     "USER_DETAILS_SERIALIZER": "accounts.serializers.CustomUserDetailsSerializer"
# # }

# class Userserializer(UserDetailsSerializer):

#     class Meta(UserDetailsSerializer):
#         model = User
#         fields = '__all__'
