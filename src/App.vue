<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar';

export default {
  components: {Navbar},
  name: 'App'
}
</script>

<style>
body {
  background: #ddd;
}
</style>
