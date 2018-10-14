import axios from 'axios';

axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.request.use((config) =>{
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers['auth-key'] = localStorage.getItem("token_u") || "";
    return config
});

axios.interceptors.response.use((res) =>{
	console.log('res.data--------------------');
	console.log(res.data);
	return res.data;
});

export const viewCarouselsService = data => axios.post('/api/boyp/get_carousel_list/', data);

export const getProdListService = data => axios.post('/api/boyp/get_prod_list/', data);

export const getItemDetailService = data => axios.post('/api/boyp/get_item_detail/', data);

export const getTklService = data => axios.post('/api/boyp/get_tkl/', data);

export const getProdDetailService = data => axios.post('/api/boyp/get_prod_detail/', data);

export const giveLikeService = data => axios.post('/api/boyp/give_like/', data);

export const getRecItemListService = data => axios.post('/api/boyp/get_rec_item_list/', data);

export const countPreBuyNumService = data => axios.post('/api/boyp/count_pre_buy_num/', data);

export const getGoodShopListService = data => axios.post('/api/boyp/get_good_shop_list/', data);

export const getCategoryListService = data => axios.post('/api/boyp/get_category_list/', data);

export const getCateItemListService = data => axios.post('/api/boyp/get_cate_item_list/', data);

export const getNoticeListService = data => axios.post('/api/boyp/get_notice_list/', data);

export const searchXpService = data => axios.post('/api/boyp/search/', data);

export const addSearchKwService = data => axios.post('/api/boyp/q/', data);

export const getRecSearchKwsService = data => axios.post('/api/boyp/get_rec_search_kws/', data);

export const addShopClickNumService = data => axios.post('/api/boyp/add_shop_click_num/', data);

export const getDiscoverListService = data => axios.post('/api/boyp/get_discover_list/', data);

export const addBannerClickNumService = data => axios.post('/api/boyp/add_banner_click_num/', data);

export const getRecProdsForHomeService = data => axios.post('/api/boyp/get_rec_prods_for_home/', data);

export const getYzmForLoginService = data => axios.post('/api/boyp/get_yzm_for_login/', data);

export const userLoginService = data => axios.post('/api/boyp/user_login/', data);

export const addToCartService = data => axios.post('/api/boyp/add_to_cart/', data);

export const getCartItemListService = data => axios.post('/api/boyp/get_cart_item_list/', data);

export const getShareCartItemListService = data => axios.post('/api/boyp/get_share_cart_item_list/', data);

export const delCartItemService = data => axios.post('/api/boyp/del_cart_item/', data);

export const delCartService = data => axios.post('/api/boyp/del_cart/', data);

export const countCartPreBuyNumService = data => axios.post('/api/boyp/count_cart_pre_buy_num/', data);
