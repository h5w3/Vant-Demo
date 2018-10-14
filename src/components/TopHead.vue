<template>
	<div id="home-head">
		<div id="logo">
			<!--<span style="font-size: 23px;">ootao</span>-->
			<img src="../assets/img/logo.png" style="height:25px;width: auto;vertical-align: middle;"/>
			<span style="position:absolute;right:12px;padding:3px 0;" @click="logout">
				<!--<img style="width:22px;height: auto;vertical-align: middle;margin-top: -5px;" src="../assets/img/share.svg"/>-->
				<van-icon name="contact"/>
			</span>
		</div>
		<div style="width:100%;">
			<van-popup v-model="popupShow" class="sharePopup">
	    	<van-notice-bar :scrollable="false">分享给好友
			</van-notice-bar>
				<p id="shareTxt" v-text="url"></p>
			<van-button 
				class="btn"
				data-clipboard-target="#shareTxt"
				type="danger" 
				style="width: 94%;margin:8px auto 0;height:44px;font-size: 16px;" 
				@click="copyShare">直接复制分享</van-button>
	    	</van-popup>
		</div>
	</div>
</template>

<script>
	import Clipboard from 'clipboard';
	import Toast from 'vant/lib/toast';
	import Dialog from 'vant/lib/dialog';
	
	export default {
		components:{
		},
        data() {
            return {
            	popupShow:false,
            	dialogShow: true,
            	url:"北欧风格装修美物，每日精选，推荐给你：https://www.40hs.com"
            }
        },
        created(){},
        methods:{
        	share(){
          		this.popupShow = true;
        	},
        	logout(){
        		if(!localStorage.getItem("token")){
        			this.$router.push({
        				name:"login"
        			});
        			return false;
        		}
        		let msg = '确认退出登录吗？';
        		Dialog.confirm({
				  title: '确认退出',
				  message: msg
				}).then(()=>{
					localStorage.removeItem("token");
					Toast('退出成功');
				}).catch(() => {
				  // on cancel
				});
        	},
        	copyShare(){
        		const _this = this;
	        	const clipboard = new Clipboard('.btn');
			    clipboard.on('success', function(e) {
			        Toast('复制成功');
			        _this.popupShow = false;
			    });
			    clipboard.on('error', function(e) {
			        Toast('复制失败，请手动复制');
			    });
        	},
        	addCollection(){
        		Dialog.alert({
				  title: '加入收藏',
				  message: '微信搜索公众号【北欧优品】添加关注，发送消息“美物”，即可。请记住我们的网址：www.40hs.com'
				}).then(() => {
				  // on close
				});
        	}
        }
   }
</script>

<style type="text/css">
	#home-head{
		position: relative;
		z-index: 20;
	}
	#logo{
		letter-spacing: 0px;
		height: 36px;
		line-height: 38px;
		font-size: 18px;
		background: #F75B52;
		font-weight: 300;
		color: #fff;
	}
</style>