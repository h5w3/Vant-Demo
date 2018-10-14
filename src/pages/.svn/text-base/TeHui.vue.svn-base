<template>
	<div class="main">
		<div id="tehui-page">
		    <div id="list">
		    	<ul>
				  <van-list
				  v-model="loadingShow"
				  :finished="finished"
				  :offset="200"
				  @load="loadMore">
				  <li v-for="item in list">
				  	<router-link :to="`/item/${item.num_iid}?f=tehui`">
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
	import { getCateItemListService } from '@/api/service';
	import TabBar from "@/components/Tabbar";
	import TopHead from "@/components/TopHead";
	import NoDataText from "@/components/NoDataText";

	export default {
		components:{
    		TabBar,
    		TopHead,
    		NoDataText
    	},
        data() {
            return {
            	topShow: true,
            	loadingShow:true,
            	finished:false,
            	noDataTextShow:false,
                pageNum: 1,
                pageSize: 10,
                list: [],
                disabled: false
            }
        },
        created(){
        	this.getCateItemsList();
        },
        methods: {
        	async getCateItemsList(){
        		const data = {
        			cate_id: 40,
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
					this.$Notice.error({
                    	title: '获取商品列表失败',
                    	desc: res.message
                	});
				}
				this.loadingShow = false;
        	},
            loadMore() {
            	this.loadingShow = true;
		    	this.getCateItemsList();
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
        	console.log("tehui is destroyed");
        }
    }
</script>

<style type="text/css">
	@import '../assets/css/public.css';
	#list{
		padding-bottom: 50px;
	}
</style>