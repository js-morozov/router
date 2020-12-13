<template>
  <div>
    <h1>Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="'/post/' + post.id">
          <b>{{ post.name }}</b> - <span>{{ post.date }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          name: "Post name #1",
          date: "20-10-2020",
        },
        {
          id: 2,
          name: "Post name #2",
          date: "20-10-2010",
        },
        {
          id: 3,
          name: "Post name #3",
          date: "25-12-2010",
        },
      ],
    };
  },
};
</script>

<style>
</style>