import {ajax_get} from "./index";

// 获取所有用户
export const getUsersList = () => ajax_get('/users', {});
//修改用户信息
export const changeUser = () => ajax_get('/users', {});
