<template>
	<div id="cate-items">
		<van-nav-bar
		  :title="cateName"
		  left-text="返回"
		  right-text="分享"
		  left-arrow
		  fixed
		  @click-left="onClickLeft">
		  <van-icon name="search" slot="right" @click="$router.push({'name':'search'})" style="margin-right: 18px;font-size:20px"/>
		  <van-icon name="share" slot="right" @click="share" style="margin-right:2px;"/>
		</van-nav-bar>
		
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
				@click="copyShare">复制链接分享</van-button>
	    	</van-popup>
		</div>
		
		<van-tabs v-show="childCatesShow"
			@click="getChildItems"
			style="position: fixed;top:46px;left:0;height: 46px;line-height:46px;width: 100%;z-index: 1000;"
			>
			  <van-tab v-for="index in childCates.length" :title="childCates[index-1].name" :key="index">
			  </van-tab>
		</van-tabs>
		
	    <div id="list">
	    	<ul>
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
					  		<div class="volume">
					  				{{ item.volume }}人已买
				  			</div>
					  		<div class="price">
					  			<div class="final-price">
					  				￥<span style="font-size: 18px;">{{ finalPrice(item.zk_final_price_wap,item.coupon_info) }}</span>
					  			</div>
					  			<div class="reserve-price">
					  				￥{{ item.reserve_price }}
					  			</div>
					  		</div>
					  	</div>
					</van-card>
				</router-link>
			  </li>
			  </van-list>
			</ul>
			<div class="loading">
				<span class="no-data-text" v-show="noDataTextShow">
					<no-data-text></no-data-text>
				</span>
			</div>
	    </div>
	    <div class="home-btn" @click="goHome">
	    	<van-icon name="home" style="font-size: 20px;color: #555;"/>
	    	<span style="color: #666;font-size: 10px;position: fixed;bottom: 20px;left: 32px;">首页</span>
	    </div>
	    <div class="cart-btn" @click="goCart">
	    	<van-icon name="cart" style="font-size: 20px;color: #555;"/>
	    	<span style="color: #666;font-size: 10px;position: fixed;bottom:78px;left: 32px;">收藏</span>
	    </div>
	</div>
</template>

<script>
	import Clipboard from 'clipboard';
	import Toast from 'vant/lib/toast';
	import { getCateItemListService } from '@/api/service';
	import NoDataText from "@/components/NoDataText";

	export default {
		components:{
    		NoDataText
    	},
        data() {
            return {
            	popupShow:false,
            	url:"『北欧优品，好货精选』https://www.40hs.com",
            	cateId: null,
            	cateName: "",
            	loadingShow:true,
            	finished:false,
            	noDataTextShow:false,
                pageNum: 1,
                pageSize: 10,
                list: [],
                childCates:[{id:"-1",name:"推荐"}],
                childCatesShow:false,
                flag: "cate_big", // 通过该标识来判断是请求大类还是子类,
                cateIndex: -1,
            }
        },
        created(){
        	this.cateId = this.$route.params.cateId;
        	this.getCateItemsList();
        },
        methods: {
        	goHome(){
        		this.$router.push({'name':'home'});
        	},
        	goCart(){
        		this.$router.push({'name':'cart'});
        	},
        	share(){
        		this.popupShow = true;
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
        	gotoSearchPage(){
        		this.$router.push({name:"search"});
        	},
        	onClickLeft() {
		      	this.$router.push({
		      		name:"cate"
		      	});
		    },
        	async getCateItemsList(){
        		this.loadingShow = true;
        		const data = {
        			cate_id: this.cateId,
        			page_num: this.pageNum,
                    page_size: this.pageSize
        		};
        		const res = await getCateItemListService(data);
				if(res.code === 0 && res.data){
					const _list = res.data;
					if(this.cateName == ""){
						this.cateName = res.cate_name;
						this.childCates = [...this.childCates, ...res.child_cates];
						this.url = "『北欧优品』精选" + this.cateName + "，链接地址：" + window.location.href +"?f=share";
					}
					if(this.childCates.length>1){
						this.childCatesShow = true;
						document.getElementById("list").style.marginTop = '92px';
					}
					if(_list.length === 0){
						console.log("没有数据了...");
						this.noDataTextShow = true;
						this.finished = true;
					}else{
						this.list = [...this.list, ..._list];
                    	this.pageNum++;
					}
				}else{
					console.error('获取商品列表失败');
				}
				this.loadingShow = false;
        	},
        	async getChildItemsList(){
        		const index = this.cateIndex;
        		this.loadingShow = true;
        		const data = {
        			child_cate_id: this.childCates[index].id,
        			page_num: this.pageNum,
                    page_size: this.pageSize
        		};
        		const res = await getCateItemListService(data);
				if(res.code === 0 && res.data){
					const _list = res.data;
					if(_list.length === 0){
						console.log("没有数据了...");
						this.noDataTextShow = true;
						this.finished = true;
					}else{
						this.list = [...this.list, ..._list];
                    	this.pageNum++;
					}
				}else{
					console.error('获取商品列表失败');
				}
				this.loadingShow = false;
        	},
        	getChildItems(index,title){
        		this.cateIndex = index;
        		if(this.childCates[index].id == -1){ //表示获取大类
        			this.list = [];
        			this.flag = "cate_big";
        			this.pageNum = 1;
        			this.finished = false;
        			this.getCateItemsList();
        			return false;
        		}else{
        			this.list = [];
        			this.flag = "cate_child";
        			this.pageNum = 1;
        			this.finished = false;
        			this.getChildItemsList(index);
        			return false;
        		}
        	},
            loadMore() {
            	this.loadingShow = true;
		    	if(this.flag === "cate_big"){
		    		this.getCateItemsList();
		    	}
		    	if(this.flag === "cate_child"){
		    		this.getChildItemsList();
		    	}
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
        },
        destroyed(){
        	console.log("cate items is destroyed");
        }
    }
</script>

<style type="text/css">
	@import '../assets/css/public.css';
	#cate-items{
		margin-top: 46px;
	}
	#cate-items .van-nav-bar{
		z-index: 1001;
	}
	.van-nav-bar__arrow+.van-nav-bar__text{
		padding-left: 20px;
	}
	#cate-items .van-nav-bar__left{
		left: 10px;
	}
	#cate-items .van-nav-bar__text,
	#cate-items .van-nav-bar__arrow{
		color: #333;
		font-size: 16px;
	}
	#cate-items .van-nav-bar__title{
		font-size: 18px;
		font-weight: 400;
		letter-spacing: 1px;
		color: #333;
	}
	#cate-items .home-btn,#cate-items .cart-btn{
		position: fixed;
		z-index:100;
		left: 20px;
		bottom: 30px;
		width: 46px;
		height: 46px;
		background: rgba(255,255,255,0.95);
		border-radius: 50%;
		line-height: 42px;
		border:1px #f1f1f1 solid;
	}
	#cate-items .cart-btn{
		bottom: 88px;
	}
	#cate-items .home-btn:active,#cate-items .cart-btn:active{
		background: #eee;
	}
</style>