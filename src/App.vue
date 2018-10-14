<template>
  <div id="app">
    <keep-alive>
		    <router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{margin: 0;padding: 0;}
html,body{
	background: #fff;
	width: 100%;
	overflow-x: hidden;
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
@media only screen and (min-width: 768px) {
		body{background: #f6f6f6;}
		#app{width: 640px;margin: 0 auto;}
		.van-tabbar,.van-goods-action{width: 640px;left: 50%;margin-left: -320px;}
		.van-popup{width:400px !important;}
}
</style>