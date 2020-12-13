<template>
  <div>
    <h1>Post # {{ postId }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    postId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style>
</style>