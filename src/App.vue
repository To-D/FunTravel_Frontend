<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>    
  </div>
</template>

<script>
export default {
  name: 'App',
   provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive: true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(function(){
        this.isRouterAlive= true;
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a{
    text-decoration: none;  
}

.router-link-active {
  text-decoration: none;
  color:#1e1e1e
}
body{
  margin:0px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
</style>
