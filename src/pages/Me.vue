<template>
	<div class="main">
		<div id="me">
			<div class="me">
				<van-panel>
					<div slot="header">
						<div class="head-icon">
							<van-icon name="contact" />
						</div>
						<div class="name">
							13136280860
						</div>
						<van-tag type="danger">VIP 3</van-tag>
					</div>
					<div style="position: absolute;right: 14px;top: 35px;">
						<van-tag plain type="success" style="font-size: 13px;">今日签到</van-tag>
					</div>
					<div style="font-size: 12px;color: #777;padding-bottom: 12px;position: absolute;top: 108px;left:0;text-align: center;width: 100%;">
						还差100块升级VIP4，回收价升至1毛6
					</div>
					<div style="padding: 15px 0;padding-top:93px;">
						<van-progress
						  pivot-text="250"
						  color="#f2826a"
						  :percentage="60"
						/>
					</div>
				</van-panel>
			</div>
			
			<van-cell-group>
			  <van-cell title="兑换小红砖" icon="exchange-record" is-link />
			  <van-cell title="售出小红砖" icon="cash-back-record" value="当前回收价1毛4" is-link />
			</van-cell-group>
			<van-cell-group>
				<van-cell title="邀请成功记录" icon="completed" is-link />
			</van-cell-group>
			<van-cell-group>
				<van-cell title="退出账户" is-link />
			</van-cell-group>
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
	#me{
		background: #f9f9f9;
	}
	.me .van-panel{
		position: relative;
		height: 140px;
	}
	.head-icon{
		position: absolute;
		top: 14px;
		left: 14px;
		font-size: 25px;
		border: 1px #e4e4e4 solid;
		width: 66px;
		height: 66px;
		line-height: 66px;
		border-radius: 50%;
	}
	.me .name{
		position: absolute;
		top: 24px;
		left: 90px;
		font-size: 18px;
	}
	.me .van-tag--danger{
		position: absolute;
		top: 48px;
		left: 95px;
	}
	.me .van-progress__pivot{
		font-size: 12px;
		padding: 0px 8px;
		border-radius:20px;
	}
	.me .van-cell__title>span{
		font-size: 20px;
		color: #444;
	}
	#me .van-cell-group{
		margin-bottom: 12px;
	}
	#me .van-cell__title{
		text-align: left;
		font-size: 15px;
		margin-left: 4px;
	}
	#me .van-cell{
		padding: 15px 15px;
	}
	#me .van-cell-text{
		font-size: 16px;
	}
	#me .van-cell__left-icon{
		font-size: 21px;
	}
	#me .van-cell__right-icon{
		font-size: 14px;
	}
	#me .van-cell__value{
		color: #F75B52;
		opacity: 0.9;
	}
</style>