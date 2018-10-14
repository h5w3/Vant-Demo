<template>
	<div class="main">
		<div id="shop">
			<div v-show="waitShow"
				style="position: fixed;z-index:200;
				top: 10%;left: 50%;width: 30px;height: 30px;background: rgba(0,0,0,0.7);
				text-align: center;margin-left: -15px;padding: 5px;border-radius: 3px;">
				<van-loading color="white" />
			</div>
			<ul>
			<van-list
			  v-model="loadingShow"
			  :finished="finished"
			  :offset="200"
			  @load="loadMore">
				<li v-for="item in list" class="shop-list-item">
					<div class="shop-item-head" @click="enterShop(item.shop_name,item.url,item.prods[0].pict_url,item.id)">
						<div class="shop-title">
							<img v-lazy="item.pic_url"/>{{ item.shop_name }}
						</div>
						<div class="enter">
							进店看看<img src="../assets/svg/arrow-right.svg"/>
						</div>
					</div>
					<div class="products">
						<template v-for="prod in item.prods">
							<div class="prod">
								<a :href="`/item/${prod.id}`">
									<img v-lazy="prod.thumb_pic_url?prod.thumb_pic_url:prod.pict_url"/>
								</a>
							</div>
						</template>
					</div>
					<div class="shop-lis-other" v-show="item.desc">
						<div class="desc">
							{{ item.desc }}
						</div>
					</div>
				</li>
				</van-list>
			</ul>
			<div class="loading">
				<span class="no-data-text" v-show="noDataTextShow">
					<no-data-text></no-data-text>
				</span>
			</div>
			<van-popup v-model="popupShow">
		    	<van-notice-bar :scrollable="false">
	  			复制淘口令可以直接通过淘宝打开店铺链接
				</van-notice-bar>
				<van-panel title="点击 → 长按 → 全选 → 复制 → 打开淘宝">
					<textarea rows="6" style="width: 94%;margin-top: 8px;" v-model="message"></textarea>
			</van-panel>
	    </van-popup>
	    <van-popup v-model="itemPopupShow" style="padding-bottom: 50px;">
	    	<van-notice-bar :scrollable="false">
  			复制淘口令，手机淘宝直接打开
			</van-notice-bar>
			<van-panel title="点击 → 长按 → 全选 → 复制 → 打开淘宝">
				<textarea id="tkl" rows="5" style="width: 94%;margin-top: 8px;" v-model="itemMessage"></textarea>
			</van-panel>
			<van-button 
				class="btn"
				data-clipboard-target="#tkl"
				type="danger" 
				style="width: 94%;margin:8px auto 0;height:44px;font-size: 16px;" 
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
	import { getGoodShopListService, addShopClickNumService, getTklService } from '@/api/service';
	import TabBar from "@/components/Tabbar";
	import NoDataText from "@/components/NoDataText";
	
	export default {
		components:{
    		TabBar,
    		NoDataText
    	},
		data(){
			return {
				clientWidth: null,
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
                list: []
			}
		},
		created(){
			this.getHaoDianList();
			this.clientWidth = getClientWidth();
		},
		methods:{
			async getHaoDianList(){
        		const data = {
        			page_num: this.pageNum,
                    page_size: this.pageSize
        		};
        		const res = await getGoodShopListService(data);
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
					console.error("获取好店列表失败");
				}
				this.loadingShow = false;
        	},
            loadMore() {
            	this.loadingShow = true;
		    	this.getHaoDianList();
		    },
		    async enterShop(shop_name,url,logo,shop_id){
		    	this.waitShow = true;
		    	if(this.clientWidth && this.clientWidth > 768){
					window.open(url);
		   		}else{
			    	const data = {
	        			text: "淘宝好店：" + shop_name,
	        			url: url,
	        			logo: logo
	        		};
	        		const res = await getTklService(data);
					if(res.code === 0 && res.data){
						this.shop_tkl = res.data;
						this.itemMessage = `【为您推荐好店（${shop_name}）】，复制这条信息，${this.shop_tkl}，打开【手机淘宝】即可查看`;
						this.itemPopupShow = true;
					}else{
						console.error("获取店铺淘口令失败");
					}
				}
				this.waitShow = false;
		    	const data2 = {
        			shop_id: shop_id,
        			f: "shop"
        		};
        		addShopClickNumService(data2);
		   },
		   copyTkl(){
        		const clipboard = new Clipboard('.btn');
			    clipboard.on('success', function(e) {
			        Toast('复制成功，请打开手机淘宝');
			    });
			    clipboard.on('error', function(e) {
			        Toast('复制失败，请手动复制');
			    });
		   }
		},
		destroyed(){
        	console.log("shop is destroyed");
        }
    }
</script>

<style>
	#shop{
		width: 100%;
		height: auto;
		margin: 0 auto 44px auto;
		padding-top: 12px;
		padding-bottom: 12px;
		background: #fafafa;
	}
	#shop .van-popup{
		top: 35%;
		width: 85%;
		height: 208px;
		border-radius: 3px;
	}
	#shop .van-notice-bar{
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}
	.shop-list-item{
		margin: 0 auto 14px;
		padding: 0;
		width: 95%;
		height: auto;
		overflow: hidden;
		background: #fff;
		border:1px #f2f2f2 solid;
		border-radius: 3px;
	}
	.shop-item-head{
		height: 60px;
		line-height: 1.0;
	}
	.shop-item-head:after{
		content: "";
		display: table;
		height: 0;
		clear: both;
	}
	.shop-title{
		font-size: 16px;
		color: #444;
		width: 70%;
		height: 60px;
		line-height: 60px;
		text-align: left;
		float: left;
		margin-left: 10px;
	}
	.shop-title img{
		width: 40px;
		height: 40px;
		vertical-align: middle;
		margin-right: 5px;
		border-radius: 2px;
	}
	.enter{
		font-size: 12px;
		color: #fff;
		height: 24px;
		line-height: 24px;
		float: right;
		text-align: center;
		padding: 0 0 0 4px;
		margin-top: 18px;
		margin-right: 6px;
		background: rgba(247,91,82,0.75);
		border-radius: 20px;
	}
	.enter img{
		width: 18px;
		height: auto;
		vertical-align: middle;
		margin-top: -2px;
		margin-left: -2px;
	}
	.products{
		text-align: center;
		width: 100%;
		height:auto;
		min-height: 85px;
		max-height: 160px;
		overflow: hidden;
		display: flex;
	}
	.prod{
		flex: 1;
	}
	.prod > a{
		display: block;
		float: left;
		width: 100%;
		height: auto;
	}
	.products img{
		vertical-align: middle;
		float: left;
		width: 100%;
		height: auto;
	}
	.desc{
		text-align: left;
		color: #777;
		font-size: 15px;
		padding: 10px 10px 12px;
	}
	#shop .loading{
		margin: 10px auto;
	}
	#shop .text{
		background: #FAFAFA !important;
	}
</style>