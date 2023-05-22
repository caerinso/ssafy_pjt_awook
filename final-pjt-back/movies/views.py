from django.http import JsonResponse
import requests, json
from .models import Genre, Movie, Actor, Comment
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from rest_framework import status
from django.shortcuts import get_object_or_404, get_list_or_404
from .serializers import MovieSerializer, ActorSerializer, GenreSerializer, CommentSerializer

API_KEY = '627e1b2375ee1759c41cec7d89ed5cc0'
GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list'
POPULAR_MOVIE_URL = 'https://api.themoviedb.org/3/movie/popular'
TMDB_URL = 'https://api.themoviedb.org/3/movie/'

def tmdb_genres():
    response = requests.get(
        GENRE_URL,
        params={
            'api_key': API_KEY,
            'language': 'ko-KR',            
        }
    ).json()    
    for genre in response.get('genres'):
        if Genre.objects.filter(pk=genre['id']).exists(): continue        
        Genre.objects.create(
            id=genre['id'],
            name=genre['name']
        )
    return JsonResponse(response)


def get_youtube_key(movie_dict):    
    movie_id = movie_dict.get('id')
    response = requests.get(
        f'{TMDB_URL}{movie_id}/videos',
        params={
            'api_key': API_KEY
        }
    ).json()
    for video in response.get('results'):
        if video.get('site') == 'YouTube':
            return video.get('key')
    return 'nothing'

def get_actors(movie):
    movie_id = movie.id
    response = requests.get(
        f'{TMDB_URL}{movie_id}/credits',
        params={
            'api_key': API_KEY,
            'language': 'ko-kr',
        }
    ).json()
    
    for person in response.get('cast'):
        if person.get('known_for_department') != 'Acting': continue
        actor_id = person.get('id')
        if not Actor.objects.filter(pk=actor_id).exists():
            actor = Actor.objects.create(
                id=person.get('id'),
                name=person.get('name'),
            )
        actordata = get_object_or_404(Actor, pk=actor_id)
        movie.actors.add(actordata)
        if movie.actors.count() == 5:       # 5명의 배우 정보만 저장
            break

def movie_data(page=1):
    response = requests.get(
        POPULAR_MOVIE_URL,
        params={
            'api_key': API_KEY,
            'language': 'ko-kr',     
            'page': page,       
        }
    ).json()

    for movie_dict in response.get('results'):
        if not movie_dict.get('release_date'): continue   # 없는 필드 skip
        # 유투브 key 조회
        youtube_key = get_youtube_key(movie_dict)

        movie = Movie.objects.create(
            id=movie_dict.get('id'),
            title=movie_dict.get('title'),
            release_date=movie_dict.get('release_date'),
            popularity=movie_dict.get('popularity'),
            vote_count=movie_dict.get('vote_count'),
            vote_average=movie_dict.get('vote_average'),
            overview=movie_dict.get('overview'),
            poster_path=movie_dict.get('poster_path'),   
            youtube_key=youtube_key,
        )
        for genre_id in movie_dict.get('genre_ids', []):
            movie.genres.add(genre_id)


        # 배우들 저장
        get_actors(movie)


def movies_data(request):
    Genre.objects.all().delete()
    Actor.objects.all().delete()
    Movie.objects.all().delete()

    tmdb_genres()
    for i in range(1, 26):
        movie_data(i)
    return



@api_view(['GET',])
@permission_classes([IsAuthenticatedOrReadOnly])
def movie_list(request):
    if request.method == 'GET':
        movies = get_list_or_404(Movie)
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)


@api_view(['GET',])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if request.method == 'GET':
        serializer = MovieSerializer(movie)
        return Response(serializer.data)


@api_view(['POST'])
def movie_likes(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if movie.like_users.filter(pk=request.user.pk).exists():
        movie.like_users.remove(request.user)
    else:
        movie.like_users.add(request.user)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@api_view(['POST'])
def movie_attention(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if movie.attention_users.filter(pk=request.user.pk).exists():
        movie.attention_users.remove(request.user)
    else:
        movie.attention_users.add(request.user)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)



@api_view(['GET'])
def comment_list(request):
    if request.method == 'GET':
        # comments = get_list_or_404(Comment)
        comments = Comment.objects.order_by('-pk')
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)

    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['POST'])
def comment_create(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def comment_likes(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    if comment.like_users.filter(pk=request.user.pk).exists():
        comment.like_users.remove(request.user)
    else:
        comment.like_users.add(request.user)
    serializer = CommentSerializer(comment)
    return Response(serializer.data)


@api_view(['GET'])
def actor_list(request):
    actors = get_list_or_404(Actor)
    serializer = ActorSerializer(actors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def genre_list(request):
    genres = get_list_or_404(Genre)
    serializer = GenreSerializer(genres, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def search_movie(request):
    movie= get_list_or_404(Movie)
    print(movie)
    return

import pandas as pd 
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
# from sklearn.feature_extraction import stop_words

stop_words = []

@api_view(['GET'])
def similarOverview_movie(request, movie_pk):
    movies = Movie.objects.all().values()
    movie = Movie.objects.get(pk=movie_pk)
    data = pd.DataFrame(movies)
    data['overview'] = data['overview'].fillna('')
    tfidf = TfidfVectorizer(analyzer='word', stop_words = stop_words)
    tfidf_matrix = tfidf.fit_transform(data['overview'])
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    title_to_index = dict(zip(data['title'], data.index))
    #=========================================
    stri = movie.title
    idx = title_to_index[stri]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    movie_indices = [idx[0] for idx in sim_scores]
    titleList = list(data['title'].iloc[movie_indices])
    similarOverviewMovies = [ Movie.objects.get(title=t) for t in titleList ]
    serializer = MovieSerializer(similarOverviewMovies, many=True)
    return Response(serializer.data)
    # print(data)
    # print(data.overview)
    # print(tfidf.vocabulary_)
    # print(tfidf_matrix)
    # print('TF-IDF 행렬의 크기(shape) :',tfidf_matrix.shape)
    # print('코사인 유사도 연산 결과 :',cosine_sim.shape)
    # print(cosine_sim)
    # print(title_to_index)
    # print(idx)
    # print(sim_scores)
    # print(movie_indices)
    # print(data['title'].iloc[movie_indices])
    # print(titleList)
    # print(similarOverviewMovies)



