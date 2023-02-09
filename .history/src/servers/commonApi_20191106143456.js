import {
    ajax_post,
    ajax_get
} from "./index";

// 登录
export const postLogin = (data) => ajax_post('/login', data);