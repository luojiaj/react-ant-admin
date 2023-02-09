import {
    ajax_get,
    ajax_post,
    ajax_delete,
} from "./index";

// 获取用户
export const getUsersList = (page, pageSize) => {
    if (page && pageSize) {
        return ajax_get('/users?current=' + page + '&pageSize=' + pageSize, {});
    } else {
        return ajax_get('/users', {});
    }
};
//获取下载权限
export const getDownloadPermission = () => ajax_get('/statu', {});
//修改下载权限
export const putDownloadPermission = (data) => ajax_post('/statu', data);
//修改用户信息
export const putUser = (id, data) => ajax_post('/modifyUser/' + id, data);
//删除用户下
export const delUserList = (ids) => ajax_delete('/deleteUser', ids);
//修改用户下载权限
export const putAuthority = (id, data) => ajax_post('/setAuthority/' + id, data);