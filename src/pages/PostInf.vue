<template>
  <div>
    <p>The post id is: {{ postInfo.id }}</p>
    <p>The post title is: {{ postInfo.title }}</p>
    <p>The post test is: {{ postInfo.body }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postInfo: {
        id: null,
        title: "",
        body: "",
      },
    };
  },
  // computed: {
  //   user() {
  //     return this.$store.state.users.filter(user => user.id === this.$route.params.id)
  //   }
  // },
  created() {
    this.$axios
      .get(
        "https://jsonplaceholder.typicode.com/posts/" + this.$route.params.id
      )
      .then((response) => {
        this.postInfo = response.data;
      });
  },
};
</script>