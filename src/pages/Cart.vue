<template>
	<div class="main">
		<van-nav-bar
		  :title="cartItemNum"
		  left-text="返回"
		  right-text="分享"
		  left-arrow
		  fixed
		  @click-left="onClickLeft">
		  <van-icon name="delete" slot="right" @click="oneKeydel" style="margin-right: 18px;font-size:18px;margin-top: -1px;"/>
		  <van-icon name="share" slot="right" @click="share" style="margin-right:2px;font-size:18px"/>
		</van-nav-bar>
		
		<div id="cart">
			<div v-show="waitShow"
				style="position: fixed;z-index:200;
				top: 10%;left: 50%;width: 30px;height: 30px;background: rgba(0,0,0,0.7);
				text-align: center;margin-left: -15px;padding: 5px;border-radius: 3px;">
				<van-loading color="white" />
			</div>
			
			<div id="list" style="padding-top:48px;padding-bottom: 50px;">
		    	<ul class="cart-ul">
				  <van-list
				  v-model="loadingShow"
				  :finished="finished"
				  :offset="200"
				  @load="loadMore">
				  <li v-for="item in list">
				  	<router-link :to="`/item/${item.num_iid}`">
					  	<van-card :title="item.title" :thumb="item.thumb_pic_url?item.thumb_pic_url:item.pict_url">
						  	<div slot="desc">
						  		<div class="shop-type">
						  			<img v-if="item.user_type==1" class="shop-type-pic" src="../assets/svg/tmall3.svg" />
						  			<img v-else class="shop-type-pic" src="../assets/svg/taobao.svg" />
						  		</div>
						  		<div class="tags">
						  			<template v-for="i in item.tags">
						  				<van-tag plain type="primary">{{ i.name }}</van-tag>
						  			</template>
						  		</div>
						  		<div class="quan">
						  			<van-tag plain type="danger" v-show="item.coupon_info">
						  				<span class="quan-head">券</span>
						  				{{ item.coupon_info?item.coupon_info.split("减")[1]:"" }}
						  			</van-tag>
						  		</div>
						  		<!--<div class="volume">
						  				{{ item.volume }}人已买
					  			</div>-->
						  		<div class="price">
						  			<div class="final-price">
						  				￥<span style="font-size: 15px;">{{ finalPrice(item.zk_final_price_wap,item.coupon_info) }}</span>
						  			</div>
						  			<!--<div class="reserve-price">
						  				￥{{ item.reserve_price }}
						  			</div>-->
						  		</div>
						  	</div>
						</van-card>
					</router-link>
					<div class="cart-opt">
				  		<van-button size="mini" @click="delItem(`${item.cart_item_id}`,`${item.title}`)">移除</van-button>
						<van-button size="mini" type="danger" 
								@click="getTkl(`${item.cart_item_id}`,'购买',item.title,item.coupon_click_url,item.click_url,item.pict_url)">购买</van-button>
			  		</div>
				  </li>
				  </van-list>
				</ul>
				<div class="loading">
					<span class="no-data-text" v-show="noDataTextShow">
						<no-data-text></no-data-text>
					</span>
				</div>
		    </div>
			
			<div style="width:100%;">
				<van-popup v-model="popupShow" class="sharePopup">
		    	<van-notice-bar :scrollable="false">分享给好友
				</van-notice-bar>
					<p id="shareTxt" v-text="`${baseUrl}/cart/${cartId}`"></p>
				<van-button 
					class="btn"
					id="share-copy-btn"
					data-clipboard-target="#shareTxt"
					type="danger" 
					style="width: 94%;margin:8px auto 0;height:44px;font-size: 16px;" 
					@click="copyShare">复制链接分享</van-button>
		    	</van-popup>
			</div>
			
	    <van-popup v-model="itemPopupShow" style="padding-bottom: 50px;">
	    	<van-notice-bar :scrollable="false">
  			复制淘口令，手机淘宝直接打开
			</van-notice-bar>
			<van-panel title="点击 → 长按 → 全选 → 复制 → 打开淘宝">
				<textarea id="tkl" rows="5" style="width: 94%;margin-top: 8px;" v-model="itemMessage"></textarea>
			</van-panel>
			<van-button 
				class="btn"
				id="tkl-copy-btn"
				data-clipboard-target="#tkl"
				type="danger" 
				style="width: 94%;margin:6px auto 0;height:44px;font-size: 16px;" 
				@click="copyTkl">直接复制</van-button>
	    </van-popup>
		</div>
		<tab-bar></tab-bar>
	</div>
</template>

<script>
	import { getClientWidth } from '@/utils/public';
	import Clipboard from 'clipboard';
	import Toast from 'vant/lib/toast';
	import { getCartItemListService, addShopClickNumService, getTklService, delCartItemService, delCartService, countCartPreBuyNumService } from '@/api/service';
	import TabBar from "@/components/Tabbar";
	import NoDataText from "@/components/NoDataText";
	import Dialog from 'vant/lib/dialog';
	
	export default {
		components:{
    		TabBar,
    		NoDataText
    	},
		data(){
			return {
				clientWidth: null,
				baseUrl: "",
				waitShow:false,
				itemPopupShow: false,
				itemMessage:"",
				topShow: true,
				popupShow: false,
				message: "",
				loadingShow:true,
				finished:false,
            	noDataTextShow:false,
                pageNum: 1,
                pageSize: 10,
                cartId:null,
                list: [],
                totalNum:0,
                cartItemNum: "",
                xp_tkl:""
			}
		},
		created(){
			this.getCartItemList();
			this.baseUrl = location.href.split("/cart")[0];
			this.clientWidth = getClientWidth();
		},
		methods:{
			async getCartItemList(){
        		const data = {
        			page_num: this.pageNum,
                    page_size: this.pageSize
        		};
        		const res = await getCartItemListService(data);
				if(res.code === 0 && res.data){
					const _list = res.data;
					this.totalNum = res.total_num;
					this.cartItemNum = "共" + res.total_num + "个商品";
					if(_list.length === 0){
						console.log("没有数据了...");
						this.noDataTextShow = true;
						this.finished = true;
					}else{
						this.list = [...this.list, ..._list];
						this.cartId = this.list[0]["cart_id"];
                    	this.pageNum++;
					}
				}else if(res.code==403){
					console.error("没有权限,请先登录！");
					this.$router.replace({
						name: "login"
					});
				}else{
					console.error("获取收藏商品列表失败");
				}
				this.loadingShow = false;
        	},
        	async getTkl(id,t,title,coupon_click_url,click_url,pict_url){
		   		this.waitShow = true;
		   		if(this.clientWidth && this.clientWidth > 768){
		   			if(this.detail.coupon_click_url){
						window.open(coupon_click_url);
					}else{
						window.open(click_url);
					}
		   		}else{
		   			this.tipMessage = "复制淘口令，打开手机淘宝" + t;
		   			if(this.xp_tkl != ""){
			   			this.itemMessage = `【我剁手都要买的宝贝（${title}），快来和我一起瓜分红包】，复制这条信息，${this.xp_tkl}，打开【手机淘宝】即可查看`;
			   			this.itemPopupShow = true;
			   			this.waitShow = false;
			   			return false;
			   		}
			   		const data = {
	        			text: title,
	        			url: coupon_click_url?coupon_click_url:click_url,
	        			logo: pict_url
	        		};
	        		const res = await getTklService(data);
					if(res.code === 0 && res.data){
						this.xp_tkl = res.data;
						this.itemMessage = `【我剁手都要买的宝贝（${title}），快来和我一起瓜分红包】，复制这条信息，${this.xp_tkl}，打开【手机淘宝】即可查看`;
						this.itemPopupShow = true;
					}else{
						console.error("获取淘口令失败");
					}
		   		}
		   		this.waitShow = false;
		   		this.countCartPreBuyNum(id);
		   },
		   async countCartPreBuyNum(id){
		   		try{
			   		const data = {
	        			id: id,
	        		};
	        		await countCartPreBuyNumService(data);
		   		}catch(e){
		   			console.error("统计失败：" + e );
		   		}
		   },
	       loadMore() {
	        	this.loadingShow = true;
	        	if(this.list.length!==0){
	        		this.getCartItemList();
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
        	onClickLeft(){
        		this.$router.go(-1);
        	},
        	oneKeydel(){
        		let msg = '确认清空收藏的商品吗？';
        		Dialog.confirm({
				  title: '确认清空',
				  message: msg
				}).then(async () => {
				  	this.loadingShow = true;
	        		const data = {
	        			id: this.cartId
	        		};
	        		const res = await delCartService(data);
					if(res.code === 0 && res.ret == true){
						Toast({
								duration:600,
								message:"清空成功"
							});
						this.cartItemNum = "共0个商品";
						this.list = [];
					}else if(res.code==403){
						console.error("没有权限,请先登录！");
						this.$router.push({
							name: "login"
						});
					}else{
						console.error("获取收藏商品列表失败");
					}
					this.loadingShow = false;
				}).catch(() => {
				  // on cancel
				});
        	},
        	delItem(id,name){
        		let msg = '确认移除收藏里的' + name + '吗？';
        		Dialog.confirm({
				  title: '确认移除',
				  message: msg
				}).then(async () => {
				  	this.loadingShow = true;
	        		const data = {
	        			id: id
	        		};
	        		const res = await delCartItemService(data);
					if(res.code === 0 && res.ret == true){
						Toast({
								duration:600,
								message:"移除成功"
							});
						for(let i=0;i<this.list.length;i++){
							if(id==this.list[i].cart_item_id){
								this.list.splice(i,1);
							}
						}
						this.cartItemNum = "共" + (this.totalNum - 1) + "个商品";
					}else if(res.code==403){
						console.error("没有权限,请先登录！");
						this.$router.push({
							name: "login"
						});
					}else{
						console.error("获取收藏商品列表失败");
					}
					this.loadingShow = false;
				}).catch(() => {
				  // on cancel
				});
        	},
		},
		destroyed(){
        	console.log("shop is destroyed");
        }
    }
</script>

<style>
	@import '../assets/css/public.css';
	.cart-ul .van-card__thumb{
		width: 100px;
		height: 100px;
	}
	.cart-ul .van-card{
		height: 122px;
		padding:6px 8px 6px 116px;
	}
	.cart-ul .van-card__content{
		padding: 2px;
	}
	.cart-ul .van-card__title{
		font-size: 14px;
		line-height: 17px;
		max-height: 36px;
	}
	.cart-ul .price{
		right: auto;
		left: 120px;
	}
	.cart-ul .quan{
		bottom: auto;
		margin-top: 2px;
		margin-left:22px;
	}
	.cart-ul .shop-type-pic{
		margin-left: 0;
	}
	.cart-opt{
		position: absolute;
		bottom: 12px;
		right: 10px;
	}
	.van-nav-bar__text{
		color: #333;
		font-size: 16px;
		padding: 0 15px;
	}
	.van-nav-bar .van-icon{
		color: #333;
		font-size: 16px;
	}
	.van-nav-bar .van-icon:active{
		color: #999;
	}
	.van-nav-bar__arrow+.van-nav-bar__text{
		padding-left: 20px;
	}
</style>