<<template>
  <div class="container">
    <app-header></app-header>
    <app-display></app-display>
  </div>
</template>

<<script>
    import Header from "./components/Header.vue"
    import Display from './components/Display.vue'

    export default {
      components:{
        appHeader : Header,
        appDisplay : Display
      }
    }
</script>
