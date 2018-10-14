<template>
	<div id="comm">
		<div v-show="hbShow" style="z-index:1001;position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,0.85);" >
			<img src="../assets/img/temp/99.png" 
				style="position: fixed;top: 10%;left: 50%;width: 300px;height:auto;margin-left: -150px;"
				@click="showHbKl"/>
			<div style="width: 100%;margin-top:122%;text-align: center;"
				id="closeBtn"
				data-clipboard-target="#closeHbTxt"
				@click="closeHbKl">
				<van-icon name="close" style="font-size:33px;color: #fff;"/>
			</div>
			<p id="closeHbTxt" v-text="hbTxt" style="z-index: -10000;opacity: 0;"></p>
		</div>
		<div style="width:100%;">
			<van-popup v-model="hbPopupShow" class="sharePopup">
	    	<van-notice-bar :scrollable="false">领取聚划算99盛典优惠券
			</van-notice-bar>
			<p id="hbTxt" class="copyedTxt" v-text="hbTxt"></p>
			<van-button 
				class="btn"
				id="hbBtn"
				data-clipboard-target="#hbTxt"
				type="danger" 
				style="width: 94%;margin:8px auto 0;height:44px;font-size: 16px;" 
				@click="copyHbKl">复制口令</van-button>
	    	</van-popup>
		</div>
	</div>
</template>

<script>
	import Clipboard from 'clipboard';
	import Toast from 'vant/lib/toast';
	
	export default{
		data(){
			return {
				hbShow: true,
				hbPopupShow:false,
				hbTxt:"复制口令€0PLLb3KVwPq€,打开手机淘宝抢券",
			}
		},
		created(){
			console.log("i am comm");
			const d = new Date();
			const month = d.getMonth() + 1;
			const day = d.getDate();
			console.log("month:" + month);
			if(window.sessionStorage.getItem("hb618") ||(month == 9 && day > 10)){
        		this.hbShow = false;
        	}
		},
		methods:{
			copyHbKl(){
        		const _this = this;
	        	const clipboard = new Clipboard('#hbBtn');
			    clipboard.on('success', function(e) {
			    	_this.hbPopupShow = false;
			        Toast.success({
				    	duration: 2000,       // 持续展示 toast
	 					forbidClick: true, // 禁用背景点击
	  					message: '复制成功！打开手机淘宝即可领取'
				    });
				    if(_this.$route.name == '618hb'){
				    	setTimeout(function(){
				    		location.href = "/";
				    	},2000);
				    }
			    });
			    clipboard.on('error', function(e) {
			        Toast('复制失败，您可以手动复制');
			    });
        	},
        	showHbKl(){
        		this.hbShow = false;
        		this.hbPopupShow = true;
        		window.sessionStorage.setItem("hb618",1);
        	},
        	closeHbKl(){
        		this.hbShow = false;
        		this.hbPopupShow = false;
        		window.sessionStorage.setItem("hb618",1);
//      		try{
//      			window.sessionStorage.setItem("hb618",1);
//		        	const clipboard = new Clipboard('#closeBtn');
//				    clipboard.on('success', function(e) {
//				    	console.log("复制成功");
//				    });
//				    clipboard.on('error', function(e) {
//				    });
//      		}catch(e){
//      			console.error(e);
//      		}
        	},
		},
		destroyed(){
        	console.log("main is destroyed");
        }
	}
</script>
<style type="text/css">
	.copyedTxt{
		padding: 30px 0 25px 0;
		font-size: 14px;
	}
	.sharePopup{
		width: 90%;
		margin: auto;
		padding-bottom: 12px;
	}
</style>