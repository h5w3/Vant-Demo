webpackJsonp([4],{LFrr:function(t,e){},yCND:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),i=a.n(n),o=a("Gu7T"),s=a.n(o),c=a("exGp"),r=a.n(c),l=a("pPmT"),p=a("TQvf"),d=a.n(p),v=a("4vvA"),u=a.n(v),h=a("gm1x"),g=a("y7b9"),f=a("/7ID"),x={components:{TabBar:g.a,NoDataText:f.a},data:function(){return{clientWidth:null,waitShow:!1,itemPopupShow:!1,itemMessage:"",topShow:!0,popupShow:!1,message:"",loadingShow:!0,finished:!1,noDataTextShow:!1,pageNum:1,pageSize:10,list:[]}},created:function(){this.getHaoDianList(),this.clientWidth=Object(l.a)()},methods:{getHaoDianList:function(){var t=this;return r()(i.a.mark(function e(){var a,n,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={page_num:t.pageNum,page_size:t.pageSize},e.next=3,Object(h.m)(a);case 3:0===(n=e.sent).code&&n.data&&(0===(o=n.data).length?(t.noDataTextShow=!0,t.finished=!0):(t.list=[].concat(s()(t.list),s()(o)),t.pageNum++)),t.loadingShow=!1;case 6:case"end":return e.stop()}},e,t)}))()},loadMore:function(){this.loadingShow=!0,this.getHaoDianList()},enterShop:function(t,e,a,n){var o=this;return r()(i.a.mark(function s(){var c,r,l;return i.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(o.waitShow=!0,!(o.clientWidth&&o.clientWidth>768)){i.next=5;break}window.open(e),i.next=10;break;case 5:return c={text:"淘宝好店："+t,url:e,logo:a},i.next=8,Object(h.v)(c);case 8:0===(r=i.sent).code&&r.data&&(o.shop_tkl=r.data,o.itemMessage="【为您推荐好店（"+t+"）】，复制这条信息，"+o.shop_tkl+"，打开【手机淘宝】即可查看",o.itemPopupShow=!0);case 10:o.waitShow=!1,l={shop_id:n,f:"shop"},Object(h.c)(l);case 13:case"end":return i.stop()}},s,o)}))()},copyTkl:function(){var t=new d.a(".btn");t.on("success",function(t){u()("复制成功，请打开手机淘宝")}),t.on("error",function(t){u()("复制失败，请手动复制")})}},destroyed:function(){}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main"},[a("div",{attrs:{id:"me"}},[a("div",{staticClass:"me"},[a("van-panel",[a("div",{attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"head-icon"},[a("van-icon",{attrs:{name:"contact"}})],1),t._v(" "),a("div",{staticClass:"name"},[t._v("\n\t\t\t\t\t\t13136280860\n\t\t\t\t\t")]),t._v(" "),a("van-tag",{attrs:{type:"danger"}},[t._v("VIP 3")])],1),t._v(" "),a("div",{staticStyle:{position:"absolute",right:"14px",top:"35px"}},[a("van-tag",{staticStyle:{"font-size":"13px"},attrs:{plain:"",type:"success"}},[t._v("今日签到")])],1),t._v(" "),a("div",{staticStyle:{"font-size":"12px",color:"#777","padding-bottom":"12px",position:"absolute",top:"108px",left:"0","text-align":"center",width:"100%"}},[t._v("\n\t\t\t\t\t还差100块升级VIP4，回收价升至1毛6\n\t\t\t\t")]),t._v(" "),a("div",{staticStyle:{padding:"15px 0","padding-top":"93px"}},[a("van-progress",{attrs:{"pivot-text":"250",color:"#f2826a",percentage:60}})],1)])],1),t._v(" "),a("van-cell-group",[a("van-cell",{attrs:{title:"兑换小红砖",icon:"exchange-record","is-link":""}}),t._v(" "),a("van-cell",{attrs:{title:"售出小红砖",icon:"cash-back-record",value:"当前回收价1毛4","is-link":""}})],1),t._v(" "),a("van-cell-group",[a("van-cell",{attrs:{title:"邀请成功记录",icon:"completed","is-link":""}})],1),t._v(" "),a("van-cell-group",[a("van-cell",{attrs:{title:"退出账户","is-link":""}})],1)],1),t._v(" "),a("tab-bar")],1)},staticRenderFns:[]};var w=a("VU/8")(x,m,!1,function(t){a("LFrr")},null,null);e.default=w.exports}});