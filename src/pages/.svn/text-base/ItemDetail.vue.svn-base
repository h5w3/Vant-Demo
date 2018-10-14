<template>
	<div id="item-detail">
		<my-notice-bar noticeFor="详情"></my-notice-bar>
		<div v-show="waitShow"
			style="position: fixed;z-index:200;
			top: 10%;left: 50%;width: 30px;height: 30px;background: rgba(0,0,0,0.7);
			text-align: center;margin-left: -15px;padding: 5px;border-radius: 3px;">
			<van-loading color="white" />
		</div>
		<div v-show="loadingShow" style="position: fixed;top: 15%;left: 50%;width:30px;margin-left:-15px;z-index: 1001;">
			<van-loading type="spinner" color="black" />
		</div>
	    <div id="item-detail-swipper">
	    	<div style="left:8px;right: auto;top:40px" class="top-bar" @click="goBack">
				<van-icon name="arrow-left" style="color: #fff;font-size: 16px;vertical-align: middle;margin-left: -3px;margin-top: -3px;"/>
			</div>
	    	<div style="right:8px;left: auto;top:40px" class="top-bar" @click="share">
				<img style="width:20px;height: auto;vertical-align: middle;margin-top: -4px;" src="../assets/img/share.svg"/>
			</div>
			<div style="width:100%;">
				<van-popup v-model="popupShow" class="sharePopup">
		    	<van-notice-bar :scrollable="false">分享给好友
				</van-notice-bar>
					<p id="shareTxt" v-text="url"></p>
				<van-button 
					class="btn"
					id="share-copy-btn"
					data-clipboard-target="#shareTxt"
					type="danger" 
					style="width: 94%;margin:8px auto 0;height:44px;font-size: 16px;" 
					@click="copyShare">复制链接分享</van-button>
		    	</van-popup>
			</div>
	    	<van-swipe :autoplay="30000">
			  <van-swipe-item v-for="(image, index) in images" :key="index">
			    <img v-lazy="image" />
			  </van-swipe-item>
			</van-swipe>
	    </div>
	    <van-cell-group style="margin-top: -4px;padding-top: 4px;" v-show="jianDetailShow">
	      <van-cell>
	        <div class="goods-title">{{ detail.title?detail.title:"" }}</div>
	        <div class="goods-price" style="margin-top: 10px;">
	        	<span style="font-size: 14px;">￥</span>
	        	<span id="item-price" style="font-size: 22px;margin-left: -4px;">
	        		{{ finalPrice(detail.zk_final_price_wap, detail.coupon_info) }}
	        	</span>
	        	<span id="item-other" v-show="detail.coupon_info" style="color: #999;font-size: 12px;">
	        		券后价
	        	</span>
	        	<span class="volume">
	        		{{ detail.volume }}人已买
	        	</span>
	        </div>
	      </van-cell>
	      <van-cell class="goods-express">
	        <van-col span="18">
	        	<span v-if="detail.tags && detail.tags.length == 0">
	        		小编推荐
	        	</span>
	        	<template v-for="(tag, index) in detail.tags">
	        		{{ tag.name }} 
	        		{{ index!==(detail.tags.length-1)?"·":""}}
	        	</template>
	        </van-col>
	        <van-col span="6">
	        	<div class="quan" v-show="detail.coupon_info">
		  			<van-tag plain type="danger">
		  				<span class="quan-head">券</span>
		  				{{ detail.coupon_info?detail.coupon_info.split("减")[1]:"" }}
		  			</van-tag>
		  		</div>
	        </van-col>
	      </van-cell>
	    </van-cell-group>
	    <van-cell-group class="goods-cell-group" @click.native="getProdDetail" v-show="jianDetailShow">
	      <van-cell title="商品详情" is-link style="font-size: 16px;padding: 12px 12px 12px 30px;"/>
	    </van-cell-group>
	    <div style="text-align: center;width: 30px; margin: 4px auto 0;" v-show="getProdDetailLoading">
		    <van-loading type="spinner" color="black"/>
	    </div>
	    <div id="prod-detail" v-html="prodDetail"></div>
	    <div class="rec-title" v-show="list && list.length">
	    	<div style="position: relative;z-index: 10;margin: 22px auto 0;width:60%;height: 1px;background: #ccc;transform: scaleY(0.5);"></div>
	    	<p style="position: relative;z-index: 20;background: #f6f6f6;width: 80px;height:20px;line-height:20px;margin: 0 auto;margin-top: -12px;">精选推荐</p>
	    </div>
		<div class="rec-goods">
	    	<van-row gutter="12">
		    	<template v-for="item in list">
				  <van-col span="12">
				  	<a :href="`/item/${item.id}`">
					  	<div class="rec-item">
					  		<div class="item-pic">
					  			<img :src="item.thumb_pic_url?item.thumb_pic_url:item.pict_url" v-lazy="item.thumb_pic_url?item.thumb_pic_url:item.pict_url"/>
						  	</div>
						  	<div class="item-props">
						  		<p class="title">{{ item.title }}</p>
						  		<p class="price">￥{{ item.price }}</p>
						  	</div>
					  	</div>
				  	</a>
				  </van-col>
				</template>
			</van-row>
	    </div>
	    
	    <van-goods-action>
	      <van-goods-action-mini-btn icon="home" @click="goToHome">
	        	首页
	      </van-goods-action-mini-btn>
	      <van-goods-action-mini-btn icon="shop" v-show="detail.shop_url" @click="goToShop">
	        	店铺
	      </van-goods-action-mini-btn>
	      <!--<van-goods-action-mini-btn icon="cart" @click="goToCart">
	        	收藏
	      </van-goods-action-mini-btn>-->
	      <van-goods-action-mini-btn icon="like-o" @click="like" :style="likeColorChange?'color:#F75B52':'color:#777'">
	        	<span style="font-size: 12px;">{{ detail.like_num }}</span>
	      </van-goods-action-mini-btn>
	      <!--<van-goods-action-big-btn icon="share" @click="addToCart">
	        	{{ detail.user_type === "1"? "天猫":"淘宝" }}购买
	        	加入收藏
	      </van-goods-action-big-btn>-->
	      <van-goods-action-big-btn icon="share" @click="getTkl('加入购物车')">
	        	加入购物车
	      </van-goods-action-big-btn>
	      <van-goods-action-big-btn primary @click="getTkl('购买')">
	        	{{ detail.user_type === "1"? "天猫":"淘宝" }}购买
	      </van-goods-action-big-btn>
	    </van-goods-action>
	    <van-popup v-model="itemPopupShow" style="padding-bottom: 50px;">
	    	<van-notice-bar :scrollable="false">
	    		{{ tipMessage }}
			</van-notice-bar>
			<van-panel title="点击 → 长按 → 全选 → 复制 → 打开淘宝">
				<textarea id="tkl" rows="6" style="width: 94%;margin-top: 8px;" v-model="itemMessage"></textarea>
			</van-panel>
			<van-button 
				class="btn"
				id="tkl-copy-btn"
				data-clipboard-target="#tkl"
				type="danger" 
				style="width: 94%;margin:6px auto 0;height:44px;font-size: 16px;" 
				@click="copyTkl">直接复制</van-button>
	    </van-popup>
	    
	    <div class="return-top" v-show="topShow">
			<a href="#top">
				<van-icon name="arrow" />
			</a>
		</div>
	</div>
</template>

<script>
	import { getClientWidth } from '@/utils/public';
	import Clipboard from 'clipboard';
	import Toast from 'vant/lib/toast';
	import Dialog from 'vant/lib/dialog';
	import MyNoticeBar from "@/components/MyNoticeBar";
	import { getItemDetailService, getTklService, getProdDetailService, giveLikeService, getRecItemListService, countPreBuyNumService, addShopClickNumService, addToCartService } from '@/api/service';
	
	export default {
		components:{
    		MyNoticeBar
    	},
		data(){
			return {
				clientWidth: null,
				waitShow:false,
				topShow: true,
				popupShow:false,
				tipMessage:'复制淘口令，打开手机淘宝购买或加入收藏',
            	url:"『北欧优品，好货精选』https://www.40hs.com",
				loadingShow: true,
				jianDetailShow: false,
				likeColorChange: false,
				getProdDetailLoading: false,
				prodDetail: '',
				itemId:null,
				xp_tkl:"",
				shop_tkl:"",
				itemMessage:'',
				shopMessage:"",
				itemPopupShow:false,
				detail: {
			        title: '',
			        like_num: 0,
			        zk_final_price_wap: "",
			        coupon_info: '',
			        volume: "",
			        click_url:"",
			        coupon_click_url:"",
			        pict_url:"",
			        shop_tkl:"",
			        shop_url:""	,
			        shop_id: null,
			        user_type:""
			     },
				images:[],
				list: [],
			}
		},
		created(){
			this.itemId = this.$route.params.itemId;
			this.getItemDetail(this.itemId);
			try{
				const ret = localStorage.getItem(this.itemId);
				if(ret == 1){
					this.likeColorChange = true;
				}
			}catch(e){
				console.error("获取点赞情况出错");
			}
			this.clientWidth = getClientWidth();
//			this.getProdDetail();
		},
		methods:{
			goBack(){
				const curUrl = window.location.href;
				const arr = curUrl.split("?f=");
				if(arr[1] && arr[1] == "share"){
					this.$router.push({
						name:"home"
					});
				}else{
					this.$router.go(-1);
				}
			},
			share(){
        		this.popupShow = true;
        	},
        	copyShare(){
        		const _this = this;
        		const clipboard = new Clipboard('#share-copy-btn');
			    clipboard.on('success', function(e) {
			    	_this.popupShow = false;
			        Toast('复制成功');
			    });
			    clipboard.on('error', function(e) {
			        Toast('复制失败，请手动复制');
			    });
        	},
        	goToCart(){
        		this.$router.push({
        			name:'cart'
        		});
        	},
			async getItemDetail(id){
        		const data = {
        			item_id: id
        		};
        		const res = await getItemDetailService(data);
				if(res.code === 0 && res.data){
					this.detail = res.data;
					const curUrl = window.location.href;
					const arr = curUrl.split("?f=");
					if(arr[0]){
						this.url = "『北欧优品』精选" + this.detail.title + "，链接地址：" + arr[0] + "?f=share";
					}
					if(this.detail.pict_url){
						this.images.push(this.detail.pict_url);
					}
					if(this.detail.small_images){
						let small_images = this.detail.small_images.split("@@@");
						const len = small_images.length;
						for(let i=1;i<len;i++){
							this.images.push(small_images[i]);
						}
					}
					this.jianDetailShow = true;
					this.loadingShow = false;
					this.getRecItemList();
				}else{
					console.error('获取商品简版详情失败');
				}
        	},
        	async getRecItemList(){
        		const data = {};
        		const res = await getRecItemListService(data);
				if(res.code === 0 && res.data){
					this.list = res.data;
				}else{
					console.error('获取推荐的商品失败');
				}
        	},
        	async getProdDetail(){
        		if(this.prodDetail){
        			return false;
        		}
        		this.getProdDetailLoading = true;
        		const data = {
        			id: this.itemId
        		};
        		const res = await getProdDetailService(data);
				if(res.code === 0 && res.data){
					this.prodDetail = "";
					const datas = res.data;
					if(datas.length===0){
						this.getProdDetail();
						return false;
					}
					for(let i=0;i<datas.length;i++){
						let picUrl = datas[i].split("//")[1].split("</img>")[0];
						this.prodDetail += `<img src='//${picUrl}'/>`;
					}
				}else{
					console.error('获取商品详情失败');
				}
				this.getProdDetailLoading = false;
        	},
        	finalPrice(wapPrice, coupon_info){
        		if(coupon_info){
        			try{
        				const quan = (coupon_info?coupon_info.split("减")[1]:"").split("元")[0];
        				return (wapPrice - quan).toFixed(2);
        			}catch(e){
        				console.error("计算最终购买价格出错：" + e);
        			}
        		}else{
        			return wapPrice;
        		}
        	},
        	copyTkl(){
        		const _this = this;
        		const clipboard = new Clipboard('#tkl-copy-btn');
			    clipboard.on('success', function(e) {
			    	_this.itemPopupShow = false;
			        Toast('复制成功，请打开手机淘宝');
			    });
			    clipboard.on('error', function(e) {
			        Toast('复制失败，请手动复制');
			    });
        	},
			goToHome(){
				try{
					const fromArray = window.location.href.split("f=");
					const len = fromArray.length;
					const f = fromArray[len-1];
					console.log("from:::" + f);
					if(f == "home"){
						console.log("go back");
						this.$router.go(-1);
					}else{
						this.$router.push({
							name:"home"
						});
					}
				}catch(e){
					console.error("Go Home Fail!" + e);
					this.$router.push({
						name:"home"
					});
				}
			},
			async addToCart(){
				try{
					const data = {
	        			item_id: this.itemId
	        		};
	        		const res = await addToCartService(data);
	        		if(res.code === 403){
						this.$router.push({
							name:"login"
						});
						return;
					}
//					if(res.code === 0 && res.ret === true){
//						Toast({
//							duration:600,
//							message:"添加收藏成功"
//						});
//					}else{
//						console.error("添加收藏失败");
//						Toast({
//							duration:600,
//							message:"添加收藏失败"
//						});
//					}
				}catch(e){
					console.error("Add To Cart Fail!" + e);
				}
			},
		   	async getTkl(t){
		   		this.waitShow = true;
		   		this.countPreBuyNum();
		   		if(this.clientWidth && this.clientWidth > 768){
		   			if(this.detail.coupon_click_url){
						window.open(this.detail.coupon_click_url);
					}else{
						window.open(this.detail.click_url);
					}
		   		}else{
		   			this.tipMessage = "复制淘口令，打开手机淘宝" + t;
		   			if(this.xp_tkl != ""){
			   			this.itemMessage = `【我剁手都要买的宝贝（${this.detail.title}），快来和我一起瓜分红包】，复制这条信息，${this.xp_tkl}，打开【手机淘宝】即可查看`;
			   			this.itemPopupShow = true;
			   			this.waitShow = false;
			   			return false;
			   		}
			   		const data = {
	        			text: this.detail.title,
	        			url: this.detail.coupon_click_url?this.detail.coupon_click_url:this.detail.click_url,
	        			logo: this.detail.pict_url
	        		};
	        		const res = await getTklService(data);
					if(res.code === 0 && res.data){
						this.xp_tkl = res.data;
						this.itemMessage = `【我剁手都要买的宝贝（${this.detail.title}），快来和我一起瓜分红包】，复制这条信息，${this.xp_tkl}，打开【手机淘宝】即可查看`;
						this.itemPopupShow = true;
					}else{
						console.error("获取淘口令失败");
					}
		   		}
		   		this.waitShow = false;
		   },
		   async goToShop(){
		   		this.waitShow = true;
		   		if(this.clientWidth && this.clientWidth > 768){
		   			window.open(this.detail.shop_url);
		   		}else{
			   		if(this.shop_tkl != ""){
			   			this.itemMessage = `【为您推荐好店（${this.detail.shop_name}）】，复制这条信息，${this.shop_tkl}，打开【手机淘宝】即可查看`;
			   			this.itemPopupShow = true;
			   			this.waitShow = false;
			   			return false;
			   		}
	        		const data = {
	        			text: "淘宝好店：" + this.detail.shop_name,
	        			url: this.detail.shop_url,
	        			logo: this.detail.pict_url
	        		};
	        		const res = await getTklService(data);
					if(res.code === 0 && res.data){
						this.shop_tkl = res.data;
						this.itemMessage = `【为您推荐好店（${this.detail.shop_name}）】，复制这条信息，${this.shop_tkl}，打开【手机淘宝】即可查看`;
						this.itemPopupShow = true;
					}else{
						console.error("获取店铺淘口令失败");
					}
				};
				this.waitShow = false;
				const data2 = {
        			shop_id: this.detail.shop_id,
        			f: "detail"
        		};
        		addShopClickNumService(data2);
		   },
		   async countPreBuyNum(){
		   		try{
			   		const data = {
	        			id: this.itemId,
	        		};
	        		await countPreBuyNumService(data);
		   		}catch(e){
		   			console.error("统计失败：" + e );
		   		}
		   },
		   async like(){
		   		try{
		   			this.addToCart();
		   			console.log(localStorage.getItem(this.itemId));
		   			if(localStorage.getItem(this.itemId) == 1){
		   				this.detail.like_num--;
		   				localStorage.removeItem(this.itemId);
		   				this.likeColorChange = false;
		   				return false;
			   		}
		   			this.detail.like_num++;
		   			this.likeColorChange = true;
			   		const data = {
	        			id: this.itemId,
	        		};
	        		const res = await giveLikeService(data);
					if(res.code === 0 && res.ret === true){
						localStorage.setItem(this.itemId, 1);
					}else{
						console.error("点赞失败");
					}
		   		}catch(e){
		   			console.error("点赞失败：" + e );
		   		}
		   },
		},
		destroyed(){
        	console.log("detail is destroyed");
        }
    }
</script>

<style type="text/css">
	@import '../assets/css/public.css';
	
	#item-detail-swipper .van-swipe-item,#item-detail-swipper img{
		width: 100%;
		height: auto;
	}
	#item-detail{
		font-size: 14px;
		background: #f9f9f9;
	}
	#item-detail .top-bar{
		position:absolute;left:8px;top:8px;width:35px;height:35px;background: rgba(0,0,0,0.4);
		z-index: 100;border-radius: 50%;text-align: center;line-height: 35px;
	}
	#item-detail .rec-goods{
		padding: 10px;
		background: #f9f9f9;
		padding-bottom: 50px;
	}
	#item-detail .rec-item{
		background: #fff;
		border-radius: 2px;
	}
	#item-detail .rec-item:active{
		background: #efefef;
	}
	#item-detail .item-pic{
		margin: 0;
		width: 100%;
	}
	#item-detail .item-props{
		margin: 0;
	}
	#item-detail .van-col img{
		width: 100%;
		height: auto;
	}
	#item-detail .van-col .title{
		margin: 0 auto;
		text-align: left;
		height: 20px;
		padding: 0 3px;
		line-height: 20px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 13px;
		color: #666;
	}
	#item-detail .van-col .price{
		position: relative;
		right: auto;
		bottom: auto;
		padding: 4px 0;
		margin: 0 auto 12px;
		text-align: center;
		font-size: 16px;
		color: #f44;
	}
	#item-detail .rec-title{
		background: #f9f9f9;
		padding-top: 8px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 17px;
	}
	#item-detail .goods-title{
		font-size: 18px;
		color: #333;
	}
	#item-detail .volume{
		position: relative;
		bottom: auto;
		float: right;
		margin-left: 15px;
		font-size: 15px;
		color: #777;
	}
	#item-detail .goods-price{
		font-size: 18px;
		color: #f44;
	}
	#item-detail .goods-express{
		margin-bottom: 12px;
	}
	#item-detail .van-cell__text{
		line-height: 30px;
		font-size: 16px;
	}
	#item-detail .van-cell__right-icon{
		font-size: 14px;
	}
	#item-detail .quan{
		position: relative;
		bottom: auto;
		float: right;
		width: auto;
		margin-left: auto;
		height: 20px;
		line-height: 20px;
		background: #f60;
	}
	#item-detail .van-tag{
		font-size: 12px;
		padding: 0 5px;
	}
	#item-detail .van-tag--danger{
		font-size: 14px;
		height: 20px;
		line-height: 20px;
	}
	#item-detail .quan-head{
		background: #f60;
		color: #fff;
		font-size: 15px;
		padding:0 4px 1px;
		margin-left: -4px;
	}
	#item-detail .quan .van-tag,#item-detail .quan .van-tag::after{
		border-radius: 0;
	}
	#item-detail .quan .van-hairline--surround::after{
		border-left:3px #f60 dotted;
	}
	#item-detail .van-popup{
		top: 35%;
		width: 85%;
		height: 208px;
		border-radius: 3px;
	}
	#item-detail .van-notice-bar{
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}
	.van-goods-action{
		z-index: 1001;
	}
	#prod-detail{
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	#prod-detail img{
		width: 100%;
		height: auto;
	}
	#item-detail .sharePopup{
		padding-bottom: 10px;width:86%;top:32%;height: auto;
	}
	#shareTxt{
		height:auto;line-height: 22px;padding:24px 12px;color:#555;
		font-size: 15px;text-align: left;word-wrap:break-word;
	}
	#jiangli{
		position: fixed;
		left: 0;
		bottom: 50px;
		right: 0;
		z-index: 999;
	}
	#jiangli .van-notice-bar__content{
		right: 0;
	}
</style>