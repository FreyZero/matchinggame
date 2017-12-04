<<template>
  <div class="col-xs-3">
    <div class="card text-center">
        <slot></slot>
    </div>
  </div>
</template>

<<script>
export default {
  data: function () {
      return {

      }
  }
}
</script>

<style scoped>
    .card {
        cursor: pointer;
        border-color: #ddd;
        padding: 5px;
    }
    
    .card:hover {
        background-color: #ffe2e2;
    }
    
</style>