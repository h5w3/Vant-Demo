import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Page404 = () => import('@/pages/Page404');
const Home = () => import('@/pages/Home');
const Shop = () => import('@/pages/Shop');
const Category = () => import('@/pages/Category');
const TeHui = () => import('@/pages/TeHui');
const CateItems = () => import('@/pages/CateItems');
const ItemDetail = () => import('@/pages/ItemDetail');
const Search = () => import('@/pages/Search');
const SearchList = () => import('@/pages/SearchList');
const Cart = () => import('@/pages/Cart');
const CartShare = () => import('@/pages/CartShare');
const Me = () => import('@/pages/Me');
const Login = () => import('@/pages/Login');

export default new Router({
	mode:"history",
	routes: [
		{ 
			path: '*', 
			component: Page404
		},
	  	{
	  		path: '/',
		    name: 'home',
		    component: Home,
		    meta:{
		    	keepAlive: true
		    }
		},
		{
			path: '/shop',
		    name: 'shop',
		    component: Shop,
		    meta:{
		    	keepAlive: true
			}
		},
		{
			path: '/cate',
		    name: 'cate',
		    component: Category,
		    meta:{
		    	keepAlive: true
			}
		},
		{
			path: '/cart',
		    name: 'cart',
		    component: Cart,
		    meta:{
		    	keepAlive: true
			}
		},
		{
			path: '/cart/:cartId',
		    name: 'cart_share',
		    component: CartShare,
		    meta:{
		    	keepAlive: true
			}
		},
		{
			path: '/login',
		    name: 'login',
		    component: Login,
		    meta:{
		    	keepAlive: false
			}
		},
		{
			path: '/u',
		    name: 'u',
		    component: Me,
		    meta:{
		    	keepAlive: true
			}
		},
		{
			path: '/tehui',
		    name: 'tehui',
		    component: TeHui,
		    meta:{
		    	keepAlive: true
			}
		},
		{
			path: '/cate/:cateId',
		    name: 'cate_items',
		    component: CateItems,
		    meta:{
		    	keepAlive: true
			}
		},
		{
			path: '/item/:itemId',
		  	name: 'item',
	      	component: ItemDetail,
	      	meta:{
		    	keepAlive: false
			}
		},
		{
			path: '/search',
		  	name: 'search',
	      	component: Search,
	      	meta:{
		    	keepAlive: false
			}
		},
		{
			path: '/q',
		  	name: 'search_result',
	      	component: SearchList,
	      	props: (route) => ({ query: route.query.kw }),
	      	meta:{
		    	keepAlive: true
			}
		}
	],
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
		    return { x: 0, y: 0 }
		}
	}
})
