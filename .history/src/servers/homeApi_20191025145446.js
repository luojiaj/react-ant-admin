import {ajax_get} from "./index";

// 获取所有用户
export const getUsersList = (data) => ajax_get('/users', data);
