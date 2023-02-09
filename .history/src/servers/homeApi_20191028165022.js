import {
    ajax_get,
    ajax_post
} from "./index";

// 获取所有用户
export const getUsersList = () => ajax_get('/users', {});
//修改用户信息
export const putUser = (id, data) => ajax_post('/modifyUser/' + id, data);