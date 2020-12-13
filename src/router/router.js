import Vue from "vue";
import Router from 'vue-router'
import Home from '../pages/HomePage'
import Post from '../pages/Post'
import PostItem from '../pages/PostItem'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/post',
      name: 'post',
      component: Post,
    },
    {
      path: '/post/:id',
      name: 'postItem',
      component: PostItem,
    },
  ]
})