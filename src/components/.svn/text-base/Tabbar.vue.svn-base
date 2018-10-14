<template>
	<div id="tabbar">
		<van-tabbar v-model="active">
			<van-tabbar-item icon="home" url="/">首页</van-tabbar-item>
			<van-tabbar-item icon="wap-nav" url="/cate">分类</van-tabbar-item>
		  	<van-tabbar-item icon="shop-collect" url="/shop">好店</van-tabbar-item>
		  	<van-tabbar-item icon="like-o" url="/cart" dot>喜欢</van-tabbar-item>
		  	<!--<van-tabbar-item icon="search" url="/search">搜索</van-tabbar-item>-->
		  	<!--<van-tabbar-item icon="contact" url="/u">我的</van-tabbar-item>-->
		</van-tabbar>
		<!--<comm></comm>-->
	</div>
</template>

<script>
//	import Comm from "@/components/Comm";
	
	export default{
		components:{
//  		Comm
    	},
		data(){
			return {
				active: 0,
			}
		},
		created(){
			const activeName = this.$route.name;
			if(activeName === "home"){
				this.active = 0;
			}else if(activeName === "cate"){
				this.active = 1;
			}else if(activeName === "shop"){
				this.active = 2;
			}else if(activeName === "cart"){
				this.active = 3;
			}/*else if(activeName === "u"){
				this.active = 3;
			}else if(activeName === "search"){
				this.active = 3;
			}*/else{
				this.active = null;
			}
		},
		methods:{},
		destroyed(){
        	console.log("main is destroyed");
        }
	}
</script>
<style type="text/css">
	.van-tabbar-item--active{
		color: #F75B52 !important;
	}
	.van-tabbar-item__icon{
		font-size: 20px;
	}
	.van-tabbar-item:active{
		background: #f6f6f6;
	}
	.van-tabbar-item__icon:active,.van-tabbar-item__text:active{
		color: #F75B52;
	}
	.van-tabbar--fixed{
		z-index: 999;
	}
	.van-tabbar-item .van-icon-search{
		font-weight: 600;
	}
</style>