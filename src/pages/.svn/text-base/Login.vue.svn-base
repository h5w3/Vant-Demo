<template>
	<div class="main">
		<div id="login">
			<div style="padding: 25px 0 15px;width: 100%;height: 60px;text-align: center;">
				<img src="/static/img/favicon.png" style="width: 60px;height: auto;"/>
			</div>
			<van-cell-group style="margin-bottom: 15px;">
			  <van-field
				    v-model="phone_num"
				    label="手机号"
				    placeholder="请输入手机号"
				    icon="clear"
				    @click-icon="phone_num = ''"
				  />
			  <van-field
				    center
				    v-model="yzm"
				    label="验证码"
				    placeholder="请输入短信验证码"
				    icon="clear"
				    @click-icon="yzm = ''"
				  >
				    <van-button slot="button" size="small" type="primary" @click="getYzm" :disabled="yzmBtnStatus">
				    	{{ btnTxt }}
				    </van-button>
			  </van-field>
			</van-cell-group>
			<van-button 
				type="primary" 
				size="large" 
				@click="login"
				:loading="loginLoadingStatus">快捷登录</van-button>
		</div>
		<!--<van-tag plain type="success" style="font-size: 12px;margin-top: 12px;">登录即表示同意服务协议&隐私政策</van-tag>-->
		<div class="tips">
			<h3>温馨提示</h3>
			<p>1、登录之后可将喜欢的商品保存，并可通过链接直接分享给好友查看；</p>
			<p>2、您的手机号将安全地存储在阿里云服务器，我们承诺不会主动给您推送促销信息，并确保您的手机号不被泄露，请您放心使用！</p>
			<!--<p>1.因购物车（收藏）功能无法直接同步到淘宝购物车，给不少粉丝朋友们造成了疑惑，暂时下线购物车功能，给你带来不便，请见谅；</p>
			<p>2.收藏商品没有数量限制，想加多少就加多少；</p>
			<p>2.已经添加到购物车（收藏）里的商品仍有效，仍可分享、购买。</p>-->
		</div>
		<van-icon name="close" 
			@click="notLogin"
			style="font-size: 30px;position: fixed;bottom: 30px;left: 50%;margin-left: -15px;"/>
	</div>
</template>

<script>
	import Toast from 'vant/lib/toast';
	import { getYzmForLoginService, userLoginService } from '@/api/service';
	
	export default {
		components:{},
		data(){
			return {
				inviterShow:false,
				phone_num:null,
				yzm:null,
				waitShow:false,
				btnTxt: '发送验证码',
				yzmBtnStatus: false,
				loginLoadingStatus:false,
				phoneReg:/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
				yzmReg: /^\d{4}$/
			}
		},
		created(){
			document.title = '登录';
		},
		methods:{
        	async getYzm(){
        		if(!this.phone_num){
        			Toast("手机号不能为空！");
        			return;
        		}
        		if(!this.phoneReg.test(this.phone_num)){
        			Toast("请输入正确的手机号！");
        			return;
        		}
        		const url = location.href;
        		const title = document.title;
        		const data = {
        			url:url,
        			title:title,
        			phone_num: this.phone_num
        		};
        		const res = await getYzmForLoginService(data);
				if(res.code === 0 && res.ret === true){
					Toast({
						duration:1000,
						message:"验证码发送成功，请注意查收！"
					});
					let t = 60;
					const i = setInterval(()=>{
						if(t==1){
							clearInterval(i);
							this.yzmBtnStatus = false;
							this.btnTxt = '获取验证码';
							return;
						}
						t = t - 1;
						this.btnTxt = t + '秒后重发';
						this.yzmBtnStatus = true;
					},1000)
				}else{
					Toast(res.message);
				}
        	},
        	async login(){
        		if(!this.phone_num){
        			Toast("手机号不能为空！");
        			return;
        		}
        		if(!this.phoneReg.test(this.phone_num)){
        			Toast("手机号格式不正确！");
        			return;
        		}
        		if(!this.yzmReg.test(this.yzm)){
        			Toast("请输入正确的4位数验证码");
        			return;
        		}
        		this.loginLoadingStatus = true;
        		const url = location.href;
        		const title = document.title;
        		const data = {
        			url:url,
        			title:title,
        			phone_num: this.phone_num,
        			yzm: this.yzm
        		};
        		const res = await userLoginService(data);
				if(res.code === 0 && res.ret === true){
					Toast({
						duration:600,
						message:"登录成功！"
					});
					localStorage.setItem("token_u", res.token);
					localStorage.setItem("name", this.phone_num);
					this.$router.go(-1);
				}else{
					Toast(res.message);
					this.loginLoadingStatus = false;
				}
        	},
        	notLogin(){
        		this.$router.go(-1);
        	}
		},
		destroyed(){
        	console.log("login is destroyed");
        	document.title = '北欧优品，好货精选';
        }
    }
</script>

<style>
	#login,#inviter{
		background: #f6f6f6;
	}
	#login .van-cell__title,#inviter .van-cell__title{
		text-align: left;
	}
	#login .van-cell,#inviter .van-cell{
		padding: 14px 15px;
	}
	#inviter .van-nav-bar{
		height: 52px;
		line-height: 52px;
	}
	#inviter .van-nav-bar__text{
		color: #333;
		font-size: 16px;
	}
	#inviter .van-nav-bar__arrow{
		color: #333;
	}
	#inviter .van-nav-bar__right .van-nav-bar__text{
		color: #38f;
	}
	.tips{
		width: 92%;
		margin: 12px auto;
		color: #888;
		font-size: 13px;
		text-align: center;
	}
	.tips h3{
		margin: 25px 0 12px;
		font-weight: 500;
		text-align: left;
	}
	.tips p{
		text-align: left;
		font-size: 13px;
		color: #999;
		line-height: 20px;
		margin-bottom: 12px;
	}
	#login .van-button,#inviter .van-button{
		border-radius: 1px;
	}
</style>