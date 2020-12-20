<template>
  <div>
    <h1>Posts</h1>
    <ol>
      <li v-for="post in posts" :key="post.id">
        <router-link class="router" :to="'/post/' + post.id">
          <h1>{{ post.title }}</h1>
        </router-link>
      </li>
    </ol>
    <hr />
    <ol>
      <li v-for="album in albums" :key="album.id">
        <h1>{{ album.title }}</h1>
      </li>
    </ol>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["posts"]),
    ...mapGetters({ albums: "getTenAlbums" }),
  },
  created() {
    if (!this.$store.state.posts.length) {
      this.$store.dispatch("getPosts");
    }
    if (!this.$store.state.albums.length) {
      this.$store.dispatch("getAlbums");
    }
  },
};
</script>

<style>
h1 {
  font-size: 20px;
}
.router {
  text-decoration: none;
  color: black;
}
.router:hover {
  color: blue;
}
</style>
