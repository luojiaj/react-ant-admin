import {ajax_get} from "./index";

// 获取所有用户
export const getUsersList = () => ajax_get('/users', {});
