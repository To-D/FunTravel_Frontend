<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

a{
    text-decoration: none;  
    color:#f48840;
}

.router-link-active {
  text-decoration: none;
  color:#1e1e1e
}
body{
  margin:0px;
}
</style>
