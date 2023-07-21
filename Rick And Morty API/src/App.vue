<template>
  <div id="id">
    <nav class="nav">
      <router-link to="/">Home</router-link>
      /
      <router-link to="/characters">Characters</router-link>
      /
      <router-link to="/locations">Locations</router-link>
    </nav>
    <router-view></router-view>
  </div>

</template>

<script setup>


</script>

<style>
.nav {
  width: 100%;
  height: 100px;
  background: #cccccc;
  font-size: 25px;
  text-align: center;
  margin-bottom: 20px;
}

.searchInput {
  padding: 5px 50px;
}
</style>