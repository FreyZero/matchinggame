<template>
  <div>
      <h1 class="panel panel-warning">Home Page</h1>
      <div class="progress">
        <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" 
            aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" :style="{width: progress + '%'}">
            <span class="sr-only">40% Complete (success)</span>
        </div>
    </div>
    <div>
            <a href="http://localhost:8080/#/game">GAME</a>
    </div>
    <div>
        <button @click="testReq()" class="btn btn-success">Test API</button>
        <p>{{ getReq }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

export default {
  data : function () {
      return {
          progress : 20,
          getReq : "Display data from request"
      }
  },
  methods : {
      testReq() {
          axios.get('/users/2').then(function (response) {
              console.log('success!');
                console.log(response);
        }).catch(function (error) {
            console.log('Error!');
                console.log(error);
        });
      }
  }
}
</script>

