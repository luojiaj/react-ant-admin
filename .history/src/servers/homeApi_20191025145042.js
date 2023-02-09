import {ajax_get} from "./index";

// 获取所有用户
export const getStoreAllList = (data) => ajax_get('/fe/storeManage/storeAllList/get/', data);
