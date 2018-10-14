<template>
	<div class="main">
		<top-head></top-head>
	    <van-search placeholder="输入关键字，搜索好货" 
	    			v-on:click.native="$router.push({'name':'search'})"
	    			style="background: #f75b52;z-index: 2;opacity: 1;"/>
	    
		<my-notice-bar noticeFor="首页"></my-notice-bar>
		<div id="home-page">
			<div id="swiper" v-show="swiperShow">
				<van-swipe :autoplay="3000">
				  <van-swipe-item v-for="(item, index) in carousels" :key="index">
				  	<a href="javascript:void(0)" @click="goSwipeDetail(`${item.click_url}`,item.id)">
				  		<img v-lazy="item.pic_url" />
				  	</a>
				  </van-swipe-item>
				</van-swipe>
		    </div>
		    
		    <!--<div id="home-cate" v-show="cateList && cateList.length > 0">
				<ul class="category-ul">
					<template v-for="item in cateList">
						<li class="category-li">
							<a :href="`/cate/${item.id}`">
								<div class="pic">
									<img v-lazy="item.pic_url?item.pic_url:''">
								</div>
				            	<p>{{ item.name }}</p>
			            	</a>
						</li>
					</template>
					<li class="category-li">
							<a :href="/cate/">
								<div class="pic">
									<img src="../assets/img/cate.png">
								</div>
				            	<p>分类</p>
			            	</a>
					</li>
				</ul>
			</div>-->
		    
		    <div id="list">
		    	<ul>
				  <van-list
				  v-model="loadingShow"
				  :finished="finished"
				  :offset="200"
				  @load="loadMore">
				  <li v-for="item in list">
				  	<router-link :to="`/item/${item.num_iid}?f=home`">
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
						  		<div class="quan" v-show="item.coupon_info">
						  			<van-tag plain type="danger">
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
		</div>
		<tab-bar></tab-bar>
		<div class="return-top" v-show="topShow">
			<a href="#top">
				<van-icon name="arrow" />
			</a>
		</div>
	</div>
</template>

<script>
	import { viewCarouselsService, getProdListService, addBannerClickNumService, getRecProdsForHomeService } from '@/api/service';
	import TabBar from "@/components/Tabbar";
	import TopHead from "@/components/TopHead";
	import NoDataText from "@/components/NoDataText";
	import MyNoticeBar from "@/components/MyNoticeBar";

	export default {
		components:{
    		TabBar,
    		TopHead,
    		NoDataText,
    		MyNoticeBar
    	},
        data() {
            return {
            	kw:'',
            	swiperShow: true,
            	topShow: true,
            	loadingShow:true,
            	finished: false,
            	noDataTextShow:false,
            	carousels: [],
                pageNum: 1,
                pageSize: 10,
                list: [],
                recItemsList:[],
                cateList: [
                			{"pic_url": "https://www.40hs.com/media/upload/img/category/1521290282.png", "id": 22, "name": "灯具"}, 
                			{"pic_url": "https://www.40hs.com/media/upload/img/category/1521290173.png", "id": 1, "name": "沙发"}, 
                			{"pic_url": "https://www.40hs.com/media/upload/img/category/1521290317.png", "id": 27, "name": "衣帽架"}, 
                			{"pic_url": "https://www.40hs.com/media/upload/img/category/1524746518.png", "id": 11, "name": "置物架"}, 
                			{"pic_url": "https://www.40hs.com/media/upload/img/category/1521290410.png", "id": 37, "name": "茶几边几"}, 
                			{"pic_url": "https://www.40hs.com/media/upload/img/category/1521290413.png", "id": 38, "name": "床及床垫"}, 
                			{"pic_url": "https://www.40hs.com/media/upload/img/category/1521290368.png", "id": 30, "name": "电视机柜"}, 
                			{"pic_url": "https://www.40hs.com/media/upload/img/category/1521290232.png", "id": 13, "name": "家居收纳"}, 
                			{"pic_url": "https://www.40hs.com/media/upload/img/category/1521290267.png", "id": 19, "name": "装饰品"}
                		],
            }
        },
        created(){
        	this.getCarouselList();
        	this.getProdList();
        },
        methods: {
        	async getCarouselList(){
        		const res = await viewCarouselsService();
				if(res.code === 0 && res.data){
					this.carousels = res.data;
					if(this.carousels.length==0){
						this.swiperShow = false;
					}
				}else{
					console.error('获取轮播失败');
				}
        	},
        	async getRecProdsForHome(){
        		const data = {
        			rec_num: 3
        		};
        		const res = await getRecProdsForHomeService(data);
				if(res.code === 0 && res.data){
					this.recItemsList = res.data;
				}else{
					console.error('获取首页推荐商品失败');
				}
        	},
        	async getProdList(){
        		const data = {
        			page_num: this.pageNum,
                    page_size: this.pageSize
        		};
        		const res = await getProdListService(data);
				if(res.code === 0 && res.data){
					const _list = res.data;
					if(_list.length === 0){
						this.finished = true;
						this.noDataTextShow = true;
					}else{
						this.list = [...this.list, ..._list];
                    	this.pageNum++;
					}
				}else{
					console.error("获取商品列表失败");
				}
				this.loadingShow = false;
        	},
        	goSwipeDetail(url,id){
        		this.addBannerClickNum(id);
        		location.href = url;
        	},
        	async addBannerClickNum(id){
        		try{
        			const data = {
	        			id: id
	        		};
        			addBannerClickNumService(data);
        		}catch(e){
        			console.error("轮播点击统计失败：" + e);
        		}
        	},
            loadMore() {
            	this.loadingShow = true;
		    	this.getProdList();
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
        	hadSold(volume){
        		if(volume>10000){
        			return '已售' + (volume/10000).toFixed(1) + '万';
        		}else{
        			return '已售' + volume;
        		}
        	},
        },
        destroyed(){
        	console.log("home is destroyed");
        }
    }
</script>

<style type="text/css">
	@import '../assets/css/public.css';
	#home-page{
		margin-top: 0px;
	}
	#swiper{
		position: relative;
		z-index: 10;
	}
	#home-page .van-swipe{
		width: 100%;
		height: 120px;
		overflow: hidden;
	}
	#home-page .van-swipe-item img{
		width: 100%;
		height: auto;
	}
	#home-page #list{
		background: #f4f4f4;
		padding-top: 0;
		padding-bottom: 50px;
	}
	#home-page .goods-title{
		font-size: 18px;
		color: #333;
	}
	#home-page .goods-price{
		font-size: 18px;
		color: #f44;
	}
	#home-page .goods-express{
		margin-bottom: 12px;
	}
	#home-page .van-hairline--top-bottom::after{
		border: none;
	}
	#home-page .van-icon-discount,.van-icon-shopping-cart{
		font-size: 18px;
		color: #F75B52;
	}
	.van-search{
		padding: 5px 6px;
	}
	.van-search .van-icon-search{
		left: 18px;
	}
	.van-search .van-cell{
		border-radius: 2px;
		padding: 5px 10px 5px 35px;
		height: 34px;
	}
	#home-cate{
		z-index: 101;
		width: 100%;
		margin: 0 auto;
		padding-top: 0;
		background: #fff;
	}
	#home-cate .category-ul{
		width: 100%;
		height: auto;
		padding-top: 2px;
		padding-bottom: 8px;
	}
	#home-cate .category-ul:after{
		display: table;
		content: '';
		clear: both;
	}
	#home-cate .category-li{
		box-sizing: border-box;
		float: left;
		width: 20%;
		height: auto;
		padding: 0 6px;
	}
	#home-cate .category-li:active{
		background: #f9f9f9;
	}
	#home-cate .category-li .pic{
		height: 58px;
		line-height: 58px;
		overflow: hidden;
	}
	#home-cate .category-li img{
		vertical-align: middle;
		width: 48%;
		height: auto;
		border:0.5px #eeb174 solid;
		border-radius: 50%;
		padding: 12%;
	}
	#home-cate .category-li p{
		height: 22px;
		line-height: 20px;
		font-size: 13px;
		color: #888;
		padding: 0;
	}
</style>