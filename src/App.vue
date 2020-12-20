<template>
  <div id="app">
    <!-- <counter /> -->
    <ul class="menu">
      <li>
        <router-link :to="{ name: 'home' }">Home page</router-link>
      </li>
      <li>
        <router-link to="/post">Post page</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.15.2/axios.js"></script>
<script>
// import Counter from "./components/Counter";

export default {
  name: "App",
  components: {
    // Counter,
  }
};
</script>

<style></style>
