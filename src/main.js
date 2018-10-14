import Vue from 'vue'

import 'vant/lib/vant-css/base.css';
import 'vant/lib/vant-css/cell.css';
import 'vant/lib/vant-css/col.css';
import 'vant/lib/vant-css/card.css';
import 'vant/lib/vant-css/tag.css';
import 'vant/lib/vant-css/tabbar.css';
import 'vant/lib/vant-css/popup.css';
import 'vant/lib/vant-css/panel.css';
import 'vant/lib/vant-css/notice-bar.css';
import 'vant/lib/vant-css/nav-bar.css';
import 'vant/lib/vant-css/row.css';
import 'vant/lib/vant-css/swipe.css';
import 'vant/lib/vant-css/list.css';
import 'vant/lib/vant-css/button.css';
import 'vant/lib/vant-css/goods-action.css';
import 'vant/lib/vant-css/loading.css';
import 'vant/lib/vant-css/dialog.css';
import 'vant/lib/vant-css/toast.css';
import 'vant/lib/vant-css/icon-local.css';
import 'vant/lib/vant-css/search.css';
import 'vant/lib/vant-css/progress.css';
import 'vant/lib/vant-css/field.css';
import 'vant/lib/vant-css/tab.css';

import Swipe from 'vant/lib/swipe';
import SwipeItem  from 'vant/lib/swipe-item';
import Lazyload  from 'vant/lib/lazyload';
import Row  from 'vant/lib/row';
import Col  from 'vant/lib/col';
import Icon  from 'vant/lib/icon';
import NavBar  from 'vant/lib/nav-bar';
import NoticeBar  from 'vant/lib/notice-bar';
import Popup  from 'vant/lib/popup';
import Panel  from 'vant/lib/panel';
import Tabbar  from 'vant/lib/tabbar';
import TabbarItem  from 'vant/lib/tabbar-item';
import Tag  from 'vant/lib/tag';
import Card  from 'vant/lib/card';
import Button from 'vant/lib/button';
import GoodsAction  from 'vant/lib/goods-action';
import GoodsActionBigBtn  from 'vant/lib/goods-action-big-btn';
import GoodsActionMiniBtn  from 'vant/lib/goods-action-mini-btn';
import Cell  from 'vant/lib/cell';
import CellGroup  from 'vant/lib/cell-group';
import List from 'vant/lib/list';
import Loading from 'vant/lib/loading';
import Search from 'vant/lib/search';
import Progress from 'vant/lib/progress';
import Field  from 'vant/lib/field';
import Tabs from 'vant/lib/tabs';
import Tab from 'vant/lib/tab';

import App from './App'
import router from './router'

Vue.use(Cell).use(CellGroup);
Vue.use(Button);
Vue.use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn);
Vue.use(Card);
Vue.use(Tag);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Popup);
Vue.use(Panel);
Vue.use(NoticeBar);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Row).use(Col);
Vue.use(Lazyload);
Vue.use(Swipe).use(SwipeItem);
Vue.use(List);
Vue.use(Loading);
Vue.use(Search);
Vue.use(Progress);
Vue.use(Field);
Vue.use(Tab).use(Tabs);

router.afterEach((to, from, next) => {
    setTimeout(()=>{
		var _hmt = _hmt || [];
		(function() {
			//每次执行前，先移除上次插入的代码
	    	document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
		  	var hm = document.createElement("script");
		  	hm.src = "https://hm.baidu.com/hm.js?163c5e4240c80a49f1305ed52ef4db5a";
		  	var s = document.getElementsByTagName("script")[0]; 
		  	s.parentNode.insertBefore(hm, s);
		})();
    },0);
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})