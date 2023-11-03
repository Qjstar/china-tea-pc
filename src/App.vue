<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import request from './utils/request';
export default{
  name:"APP",
  // created(){
  //   request({
  //     method: "GET",
  //     url: '/article/get/2',
  //     // params:{articleId:2},
  //   })
  // }
}
</script>
<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
