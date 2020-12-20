import Vue from "vue";
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    posts: [],
    albums: []
  },
  getters: {
    getTenAlbums(state) {
      return state.albums.filter((item, index) => {
        if (index < 10) return item
      })
    }
  },
  actions: {
    getPosts({ commit }) {
      axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          commit('setPosts', response.data)
        });
    },
    getAlbums({ commit }) {
      axios.get("https://jsonplaceholder.typicode.com/albums")
        .then((response) => {
          commit('setAlbums', response.data)
        });
    },
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload
    },
    setAlbums(state, payload) {
      state.albums = payload
    }
  }
})