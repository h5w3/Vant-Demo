<template>
	<div id="cate-items">
		<van-nav-bar
		  :title="cateName"
		  left-text="返回"
		  right-text="分享"
		  left-arrow
		  fixed
		  @click-left="onClickLeft"
		  @click-right="share">
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
			<div v-show="msg" style="padding: 12px 0;text-align: center;font-size: 15px;">
				{{ msg }}
			</div>
			<div class="loading">
				<span class="no-data-text" v-show="noDataTextShow">
					<no-data-text></no-data-text>
				</span>
			</div>
	    </div>
	</div>
</template>

<script>
	import { searchXpService } from '@/api/service';
	import Clipboard from 'clipboard';
	import Toast from 'vant/lib/toast';
	import TopHead from "@/components/TopHead";
	import NoDataText from "@/components/NoDataText";

	export default {
		components:{
    		TopHead,
    		NoDataText
    	},
        data() {
            return {
            	popupShow:false,
            	url:"『北欧优品，好货精选』https://www.40hs.com",
            	kw: "",
            	msg: "",
            	cateName: "",
            	loadingShow:true,
            	finished:false,
            	noDataTextShow:false,
                pageNum: 1,
                pageSize: 10,
                list: [],
            }
        },
        created(){
        	this.kw = this.$route.query.kw;
        	this.cateName = this.kw.length>8?(this.kw).substring(0,8) + "...":this.kw;
        	this.getSearchList();
        },
        methods: {
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
    				name:"search"
    			});
		    },
		    onClickRight() {
		      	Toast('按钮');
		    },
        	async getSearchList(){
        		const data = {
        			kw: this.kw,
        			page_num: this.pageNum,
                    page_size: this.pageSize
        		};
        		const res = await searchXpService(data);
				if(res.code === 0 && res.data){
					this.url = "『北欧优品』精选" + this.kw + "，链接地址：" + window.location.href;
					const _list = res.data;
					if(this.pageNum == 1 && _list.length === 0){
						this.msg = "啊噢，欧欧暂时还没有收集该类产品噢";
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
					this.$Notice.error({
                    	title: '获取商品列表失败',
                    	desc: res.message
                	});
				}
				this.loadingShow = false;
        	},
            loadMore() {
            	this.loadingShow = true;
		    	this.getSearchList();
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
        	console.log("search list is destroyed");
        },
        watch:{
		    '$route'(to,from){
			    console.log("from.name：：：" + from.name);
	    		if(from.name == "search"){
	    			this.msg = "";
	        		this.kw = this.$route.query.kw;
	        		this.cateName = this.kw.length>8?(this.kw).substring(0,8) + "...":this.kw;
	        		this.loadingShow = true;
	        		this.finished = false;
	        		this.pageNum = 1;
	            	this.pageSize = 10;
	        		this.list = [];
	        		this.getSearchList();
	        	}
		    }
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
		font-size: 17px;
		color: #333;
	}
	#cate-items .van-nav-bar__title{
		font-size: 18px;
		font-weight: 400;
		letter-spacing: 1px;
		color: #333;
	}
</style>