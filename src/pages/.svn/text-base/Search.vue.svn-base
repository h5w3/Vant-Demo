<template>
	<div id="search">
		<van-search
			placeholder="请输入关键字，如：胡桃木餐桌"
		  	v-model="kw"
		  	show-action
		  	@cancel="onCancel"
		  	@search="addSearchKw">
		  <div slot="action" @click="addSearchKw">搜索</div>
		</van-search>
		<div style="width: 96%;margin: 12px auto 0;text-align: left;">
			<p style="margin:2px 0 12px 8px;font-size: 14px;color: #666;">其他人也在搜：</p>
			<template v-for="item in recSearchKws">
				<router-link :to="`/q?kw=${item.kw}`">
					<van-button size="small" style="margin: 0 3px 8px 6px;color: #777;width: auto;">
						{{ item.kw }}
					</van-button>
				</router-link>
			</template>
		</div>
		<tab-bar></tab-bar>
	</div>
</template>

<script>
	import TabBar from "@/components/Tabbar";
	import Toast from 'vant/lib/toast';
	import { addSearchKwService, getRecSearchKwsService, getDiscoverListService } from '@/api/service';
	import NoDataText from "@/components/NoDataText";

	export default {
		components:{
    		TabBar,
    		NoDataText
    	},
        data() {
            return {
            	kw: "",
            	recSearchKws: [],
            	loadingShow:true,
            	finished: false,
            	noDataTextShow:false,
                pageNum: 1,
                pageSize: 10,
                list: [],
            }
        },
        created(){
        	this.getRecSearchKws();
        	//this.getDiscoverList();
        },
        methods: {
        	async getRecSearchKws(){
        		const res = await getRecSearchKwsService();
				if(res.code === 0 && res.data ){
					console.log(res.data)
					this.recSearchKws = res.data;
				}else{
					console.error('获取搜索推荐词失败');
				}
        	},
        	async addSearchKw() {
        		const kw = this.kw;
				if(kw.trim() === ''){
					Toast('请输入关键字');
					return false;
				}else{
	        		this.$router.push({ 
        				path: 'q', 
        				query: { kw: kw }
        			});
        			const data = {
	        			kw: this.kw
	        		};
	        		const res = await addSearchKwService(data);
				}
        	},
        	onCancel(){
        		this.$router.push({
        			name:"home"
        		});
        	},
        	async getDiscoverList(){
        		const data = {
        			page_num: this.pageNum,
                    page_size: this.pageSize
        		};
        		const res = await getDiscoverListService(data);
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
            loadMore() {
            	this.loadingShow = true;
		    	this.getDiscoverList();
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
        	}
        },
        destroyed(){
        	console.log("search is destroyed");
        }
    }
</script>

<style type="text/css">
	@import '../assets/css/public.css';
	#search .van-search{
		padding: 8px 10px 8px 10px;
		width: 100%;
	}
	#search .van-search__action{
		width: 40px;
		font-size: 16px;
		margin-left: 6px;
	}
</style>