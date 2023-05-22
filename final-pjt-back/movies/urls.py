from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views

urlpatterns = [
    path('', views.movies_data),
    path('movies/', views.movie_list),
    path('movies/<int:movie_pk>/', views.movie_detail),
    path('movies/<int:movie_pk>/likes/', views.movie_likes),
    path('movies/<int:movie_pk>/attention/', views.movie_attention),
    path('actors/', views.actor_list),
    path('genres/', views.genre_list),
    path('similarOverview/<int:movie_pk>/', views.similarOverview_movie),
    path('searchmovie/', views.search_movie),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('comments/<int:comment_pk>/likes/', views.comment_likes),
    path('movies/<int:movie_pk>/comments/', views.comment_create),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
