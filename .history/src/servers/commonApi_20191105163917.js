import Axios from 'axios'
import {ajax_get, ajax_post} from "./index";

// 登录
export const postLogin = (data) => ajax_post('/fe/user/login/', data);


