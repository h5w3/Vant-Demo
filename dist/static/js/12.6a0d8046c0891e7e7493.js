webpackJsonp([12],{"0Ws7":function(t,e){},oH0t:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),i=a.n(n),o=a("Gu7T"),s=a.n(o),r=a("exGp"),c=a.n(r),l=a("pPmT"),p=a("TQvf"),u=a.n(p),d=a("4vvA"),h=a.n(d),m=a("gm1x"),v=a("y7b9"),f=a("/7ID"),g=a("6xqC"),w=a.n(g),_={components:{TabBar:v.a,NoDataText:f.a},data:function(){return{clientWidth:null,baseUrl:"",waitShow:!1,itemPopupShow:!1,itemMessage:"",topShow:!0,popupShow:!1,message:"",loadingShow:!0,finished:!1,noDataTextShow:!1,pageNum:1,pageSize:10,cartId:null,list:[],totalNum:0,cartItemNum:"",xp_tkl:""}},created:function(){this.getCartItemList(),this.baseUrl=location.href.split("/cart")[0],this.clientWidth=Object(l.a)()},methods:{getCartItemList:function(){var t=this;return c()(i.a.mark(function e(){var a,n,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={page_num:t.pageNum,page_size:t.pageSize},e.next=3,Object(m.i)(a);case 3:0===(n=e.sent).code&&n.data?(o=n.data,t.totalNum=n.total_num,t.cartItemNum="共"+n.total_num+"个商品",0===o.length?(t.noDataTextShow=!0,t.finished=!0):(t.list=[].concat(s()(t.list),s()(o)),t.cartId=t.list[0].cart_id,t.pageNum++)):403==n.code&&t.$router.replace({name:"login"}),t.loadingShow=!1;case 6:case"end":return e.stop()}},e,t)}))()},getTkl:function(t,e,a,n,o,s){var r=this;return c()(i.a.mark(function c(){var l,p;return i.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(r.waitShow=!0,!(r.clientWidth&&r.clientWidth>768)){i.next=5;break}r.detail.coupon_click_url?window.open(n):window.open(o),i.next=16;break;case 5:if(r.tipMessage="复制淘口令，打开手机淘宝"+e,""==r.xp_tkl){i.next=11;break}return r.itemMessage="【我剁手都要买的宝贝（"+a+"），快来和我一起瓜分红包】，复制这条信息，"+r.xp_tkl+"，打开【手机淘宝】即可查看",r.itemPopupShow=!0,r.waitShow=!1,i.abrupt("return",!1);case 11:return l={text:a,url:n||o,logo:s},i.next=14,Object(m.v)(l);case 14:0===(p=i.sent).code&&p.data&&(r.xp_tkl=p.data,r.itemMessage="【我剁手都要买的宝贝（"+a+"），快来和我一起瓜分红包】，复制这条信息，"+r.xp_tkl+"，打开【手机淘宝】即可查看",r.itemPopupShow=!0);case 16:r.waitShow=!1,r.countCartPreBuyNum(t);case 18:case"end":return i.stop()}},c,r)}))()},countCartPreBuyNum:function(t){var e=this;return c()(i.a.mark(function a(){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={id:t},e.next=4,Object(m.e)(n);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0);case 9:case"end":return e.stop()}},a,e,[[0,6]])}))()},loadMore:function(){this.loadingShow=!0,0!==this.list.length&&this.getCartItemList()},copyTkl:function(){var t=this,e=new u.a("#tkl-copy-btn");e.on("success",function(e){t.itemPopupShow=!1,h()("复制成功，请打开手机淘宝")}),e.on("error",function(t){h()("复制失败，请手动复制")})},finalPrice:function(t,e){if(!e)return t;try{return(t-(e?e.split("减")[1]:"").split("元")[0]).toFixed(2)}catch(t){}},share:function(){this.popupShow=!0},copyShare:function(){var t=this,e=new u.a("#share-copy-btn");e.on("success",function(e){t.popupShow=!1,h()("复制成功")}),e.on("error",function(t){h()("复制失败，请手动复制")})},onClickLeft:function(){this.$router.go(-1)},oneKeydel:function(){var t=this;w.a.confirm({title:"确认清空",message:"确认清空收藏的商品吗？"}).then(c()(i.a.mark(function e(){var a,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.loadingShow=!0,a={id:t.cartId},e.next=4,Object(m.h)(a);case 4:0===(n=e.sent).code&&1==n.ret?(h()({duration:600,message:"清空成功"}),t.cartItemNum="共0个商品",t.list=[]):403==n.code&&t.$router.push({name:"login"}),t.loadingShow=!1;case 7:case"end":return e.stop()}},e,t)}))).catch(function(){})},delItem:function(t,e){var a=this,n="确认移除收藏里的"+e+"吗？";w.a.confirm({title:"确认移除",message:n}).then(c()(i.a.mark(function e(){var n,o,s;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.loadingShow=!0,n={id:t},e.next=4,Object(m.g)(n);case 4:if(0===(o=e.sent).code&&1==o.ret){for(h()({duration:600,message:"移除成功"}),s=0;s<a.list.length;s++)t==a.list[s].cart_item_id&&a.list.splice(s,1);a.cartItemNum="共"+(a.totalNum-1)+"个商品"}else 403==o.code&&a.$router.push({name:"login"});a.loadingShow=!1;case 7:case"end":return e.stop()}},e,a)}))).catch(function(){})}},destroyed:function(){}},x={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("van-nav-bar",{attrs:{title:t.cartItemNum,"left-text":"返回","right-text":"分享","left-arrow":"",fixed:""},on:{"click-left":t.onClickLeft}},[n("van-icon",{staticStyle:{"margin-right":"18px","font-size":"18px","margin-top":"-1px"},attrs:{slot:"right",name:"delete"},on:{click:t.oneKeydel},slot:"right"}),t._v(" "),n("van-icon",{staticStyle:{"margin-right":"2px","font-size":"18px"},attrs:{slot:"right",name:"share"},on:{click:t.share},slot:"right"})],1),t._v(" "),n("div",{attrs:{id:"cart"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.waitShow,expression:"waitShow"}],staticStyle:{position:"fixed","z-index":"200",top:"10%",left:"50%",width:"30px",height:"30px",background:"rgba(0,0,0,0.7)","text-align":"center","margin-left":"-15px",padding:"5px","border-radius":"3px"}},[n("van-loading",{attrs:{color:"white"}})],1),t._v(" "),n("div",{staticStyle:{"padding-top":"48px","padding-bottom":"50px"},attrs:{id:"list"}},[n("ul",{staticClass:"cart-ul"},[n("van-list",{attrs:{finished:t.finished,offset:200},on:{load:t.loadMore},model:{value:t.loadingShow,callback:function(e){t.loadingShow=e},expression:"loadingShow"}},t._l(t.list,function(e){return n("li",[n("router-link",{attrs:{to:"/item/"+e.num_iid}},[n("van-card",{attrs:{title:e.title,thumb:e.thumb_pic_url?e.thumb_pic_url:e.pict_url}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("div",{staticClass:"shop-type"},[1==e.user_type?n("img",{staticClass:"shop-type-pic",attrs:{src:a("QSUK")}}):n("img",{staticClass:"shop-type-pic",attrs:{src:a("HhO2")}})]),t._v(" "),n("div",{staticClass:"tags"},[t._l(e.tags,function(e){return[n("van-tag",{attrs:{plain:"",type:"primary"}},[t._v(t._s(e.name))])]})],2),t._v(" "),n("div",{staticClass:"quan"},[n("van-tag",{directives:[{name:"show",rawName:"v-show",value:e.coupon_info,expression:"item.coupon_info"}],attrs:{plain:"",type:"danger"}},[n("span",{staticClass:"quan-head"},[t._v("券")]),t._v("\n\t\t\t\t\t\t  \t\t\t\t"+t._s(e.coupon_info?e.coupon_info.split("减")[1]:"")+"\n\t\t\t\t\t\t  \t\t\t")])],1),t._v(" "),n("div",{staticClass:"price"},[n("div",{staticClass:"final-price"},[t._v("\n\t\t\t\t\t\t  \t\t\t\t￥"),n("span",{staticStyle:{"font-size":"15px"}},[t._v(t._s(t.finalPrice(e.zk_final_price_wap,e.coupon_info)))])])])])])],1),t._v(" "),n("div",{staticClass:"cart-opt"},[n("van-button",{attrs:{size:"mini"},on:{click:function(a){t.delItem(""+e.cart_item_id,""+e.title)}}},[t._v("移除")]),t._v(" "),n("van-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.getTkl(""+e.cart_item_id,"购买",e.title,e.coupon_click_url,e.click_url,e.pict_url)}}},[t._v("购买")])],1)],1)}))],1),t._v(" "),n("div",{staticClass:"loading"},[n("span",{directives:[{name:"show",rawName:"v-show",value:t.noDataTextShow,expression:"noDataTextShow"}],staticClass:"no-data-text"},[n("no-data-text")],1)])]),t._v(" "),n("div",{staticStyle:{width:"100%"}},[n("van-popup",{staticClass:"sharePopup",model:{value:t.popupShow,callback:function(e){t.popupShow=e},expression:"popupShow"}},[n("van-notice-bar",{attrs:{scrollable:!1}},[t._v("分享给好友\n\t\t\t\t")]),t._v(" "),n("p",{attrs:{id:"shareTxt"},domProps:{textContent:t._s(t.baseUrl+"/cart/"+t.cartId)}}),t._v(" "),n("van-button",{staticClass:"btn",staticStyle:{width:"94%",margin:"8px auto 0",height:"44px","font-size":"16px"},attrs:{id:"share-copy-btn","data-clipboard-target":"#shareTxt",type:"danger"},on:{click:t.copyShare}},[t._v("复制链接分享")])],1)],1),t._v(" "),n("van-popup",{staticStyle:{"padding-bottom":"50px"},model:{value:t.itemPopupShow,callback:function(e){t.itemPopupShow=e},expression:"itemPopupShow"}},[n("van-notice-bar",{attrs:{scrollable:!1}},[t._v("\n  \t\t\t复制淘口令，手机淘宝直接打开\n\t\t\t")]),t._v(" "),n("van-panel",{attrs:{title:"点击 → 长按 → 全选 → 复制 → 打开淘宝"}},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.itemMessage,expression:"itemMessage"}],staticStyle:{width:"94%","margin-top":"8px"},attrs:{id:"tkl",rows:"5"},domProps:{value:t.itemMessage},on:{input:function(e){e.target.composing||(t.itemMessage=e.target.value)}}})]),t._v(" "),n("van-button",{staticClass:"btn",staticStyle:{width:"94%",margin:"6px auto 0",height:"44px","font-size":"16px"},attrs:{id:"tkl-copy-btn","data-clipboard-target":"#tkl",type:"danger"},on:{click:t.copyTkl}},[t._v("直接复制")])],1)],1),t._v(" "),n("tab-bar")],1)},staticRenderFns:[]};var S=a("VU/8")(_,x,!1,function(t){a("0Ws7")},null,null);e.default=S.exports}});