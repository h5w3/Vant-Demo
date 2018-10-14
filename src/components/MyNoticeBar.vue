<template>
	<div id="gg" noticeFor="noticeFor">
		<van-notice-bar left-icon="/static/img/volume.png"
			mode="link"
			:scrollable="false"
		  	:text="notice.content"
		  	@click="alertNotice"/>
	</div>
</template>

<script>
	import Dialog from 'vant/lib/dialog';
	import { getNoticeListService } from '@/api/service';
	
	export default {
		props: {
		    noticeFor: [Number, String],
		},
		model: {
		    prop: 'noticeFor'
		},
        data() {
            return {
            	notice:{
                	title:"",
                	content:""
               	},
            }
        },
        created(){
        	try{
        		let content = sessionStorage.getItem(this.noticeFor);
        		if(!content){
        			this.getNoticeList();
        		}else{
        			this.notice.title = this.noticeFor;
        			this.notice.content = content;
        		}
        	}catch(e){
        		console.error(e);
        	}
        },
        methods:{
        	async getNoticeList(){
        		const data = {
        			"notice_for": this.noticeFor
        		}
        		const res = await getNoticeListService(data);
				if(res.code === 0 && res.data && res.data[0]){
					this.notice = res.data[0];
					sessionStorage.setItem(this.notice.title,this.notice.content);
				}else{
					console.error('获取通知失败');
				}
        	},
        	alertNotice(){
		    	Dialog.alert({
				  title: '公   告',
				  message: this.notice.content
				}).then(() => {
				  // on close
				});
		    },
        }
   }
</script>

<style type="text/css">
	#gg{
		height: auto;
		line-height: 1.0;
		background: #fff;
		position: relative;
		z-index: 10;
	}
	#gg .van-notice-bar{
		padding: 9px 24px 9px 8px;
	}
	#gg .van-notice-bar__right-icon{
		top: 11px;
		right: 10px;
		font-size: 12px;
	}
	#gg .van-notice-bar__content{
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>