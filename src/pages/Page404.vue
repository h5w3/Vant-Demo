<template>
	<div id="page404">
		<img src="/static/img/page404.jpg"/>
		<p>亲，很抱歉<br>您查看的页面找不到了!</p>
		<div class="btn">
			<van-button size="normal" type="primary" @click="goBack"> 上一页 </van-button>
			<van-button size="normal" type="danger" @click="goIndex">回到首页</van-button>
		</div>
	</div>
</template>

<script>
	export default {
		methods:{
			goBack(){
				this.$router.go(-1);
			},
			goIndex(){
				this.$router.push({
					name:"home"
				})
			}
		}
	}
</script>

<style type="text/css">
	#page404{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: 0 auto;
		padding: 15% 0;
		width: 100%;
		background: #f2f2f2;
		text-align: center;
	}
	#page404 img{
		width: 56%;
		height: auto;
	}
	#page404 p{
		margin-top: 40px;
		font-size: 15px;
		color: #777;
	}
	#page404 .btn{
		margin-top: 60px;
	}
	#page404 .btn button{
		width: 120px;
	}
</style>