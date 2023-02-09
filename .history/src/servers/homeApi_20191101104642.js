import {
    ajax_get,
    ajax_post,
    ajax_delete
} from "./index";

// 获取所有用户
export const getUsersList = () => ajax_get('/users', {});
//修改用户信息
export const putUser = (id, data) => ajax_post('/modifyUser/' + id, data);
//删除用户下
export const delUserList = (ids) => ajax_delete('/deleteUser/', ids);
//修改用户下载权限
export const putAuthority = (id, data) => ajax_post('/setAuthority/' + id, data);
