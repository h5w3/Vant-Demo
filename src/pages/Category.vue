<template>
	<div class="main">
		<div id="category" v-show="list && list.length > 0">
			<ul class="category-ul">
				<template v-for="item in list">
					<li class="category-li">
						<a :href="`/cate/${item.id}`">
							<div class="pic">
								<img v-lazy="item.pic_url?item.pic_url:''">
							</div>
			            	<p>{{ item.name }}</p>
		            	</a>
					</li>
				</template>
			</ul>
		</div>
		<tab-bar></tab-bar>
	</div>
</template>

<script>
	import { getCategoryListService } from '@/api/service';
	import TabBar from "@/components/Tabbar";
	
	export default {
		components:{
    		TabBar,
    	},
		data(){
			return {
				loadingShow:true,
				list: [],
			}
		},
		created(){
			this.getCategoryList();
		},
		methods:{
			async getCategoryList(){
        		const data = {};
        		const res = await getCategoryListService(data);
				if(res.code === 0 && res.data){
					this.list = res.data;
				}else{
					console.error("获取分类列表失败");
				}
				this.loadingShow = false;
        	},
		},
		destroyed(){
        	console.log("cate is destroyed");
        }
    }
</script>

<style type="text/css">
	#category{
		width: 100%;
		margin: 0 auto;
		padding-bottom: 50px;
		padding-top: 0;
		background: #fff;
	}
	#category .category-ul{
		width: 100%;
		height: auto;
	}
	#category .category-ul:after{
		display: table;
		content: '';
		clear: both;
	}
	#category .category-li{
		box-sizing: border-box;
		float: left;
		width: 25%;
		height: auto;
		padding: 10px 6px;
	}
	#category .category-li:active{
		background: #f9f9f9;
	}
	#category .category-li .pic{
		height: 70px;
		line-height: 70px;
		overflow: hidden;
	}
	#category .category-li img{
		vertical-align: middle;
		width: 40.5%;
		height: auto;
	}
	#category .category-li p{
		height: 24px;
		line-height: 24px;
		font-size: 14px;
		color: #555;
		padding: 0;
	}
</style>