import Axios from 'axios'
import {ajax_post} from "./index";

// 登录
export const postLogin = (data) => ajax_post('/login', data);


