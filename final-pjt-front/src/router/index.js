import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: () => import(/* webpackChunkName: "about" */ '../views/MainView.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import(/* webpackChunkName: "about" */ '../views/RecommendView.vue')
  },
  {
    path: '/login',
    name: 'LoginView', 
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'SignUpView', 
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUpView.vue')
  },
  {
    path: '/:id',
    name: 'DetailView', 
    component: () => import(/* webpackChunkName: "about" */ '../views/DetailView.vue')
  },
  {
    path: '/profile',
    name: 'ProfileView', 
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfileView.vue')
  },
  {
    path: '/search',
    name: 'SearchView', 
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchView.vue')
  },
  {
    path: '/like-movies',
    name: 'UserLikeMovies', 
    component: () => import(/* webpackChunkName: "about" */ '../views/UserLikeMovies.vue')
  },
  {
    path: '/attention-movies',
    name: 'UserAttentionMovies', 
    component: () => import(/* webpackChunkName: "about" */ '../views/UserAttentionMovies.vue')
  },
  {
    path: '/user-comments',
    name: 'UserComments', 
    component: () => import(/* webpackChunkName: "about" */ '../views/UserComments.vue')
  },
  {
    path: '/like-comments',
    name: 'UserLikeComments', 
    component: () => import(/* webpackChunkName: "about" */ '../views/UserLikeComments.vue')
  },
  {
    path: '/similar-genre',
    name: 'SimilarGenreMovies', 
    component: () => import(/* webpackChunkName: "about" */ '../views/SimilarGenreMovies.vue')
  },
  {
    path: '/same-actor',
    name: 'SameActorMovies', 
    component: () => import(/* webpackChunkName: "about" */ '../views/SameActorMovies.vue')
  },
  {
    path: '/similar-overview',
    name: 'SimilarOverviewMovies', 
    component: () => import(/* webpackChunkName: "about" */ '../views/SimilarOverviewMovies.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  mounted() {
    window.scrollTo(0, 0)
  }
})

export default router
