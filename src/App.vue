<template>
  <div>
    <app-header></app-header>
    <div class="container">
      <!-- <app-display></app-display> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    import Header from "./components/Header.vue"
    import Display from './components/Display.vue'

    export default {
      components:{
        appHeader : Header,
        appDisplay : Display
      }
    }
</script>

<style>
  html, body {
        overflow-x: hidden;
    }
</style>


