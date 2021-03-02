import axios, { AxiosInstance, AxiosResponse } from 'axios';
import umbrella from 'umbrella-storage';
import { notification } from 'antd';
import { IconType, ConfigProps } from 'antd/lib/notification';
import { Notify } from '../components/widget';

const openNotificationWithIcon = (type: IconType) => {
    notification[type]({
        message: '权限不够',
        description: '您的登录失效，或者账号权限不够，\n请重新登录,已经为你跳转页面',
    });
};

export default function ():AxiosInstance {
    const token = umbrella.getSessionStorage('jwt');
    axios.defaults.timeout = 8000;

    const service:AxiosInstance = axios.create({
        baseURL: '/admin',
        timeout: 8000,
        headers: {
            token: token ? 'bearer ' + token : '',
        },
    });

    service.interceptors.response.use(
        (response:AxiosResponse) => {
            if (response.headers.token) {
                umbrella.setSessionStorage('jwt', response.headers.token);
            }
            const res = response.data;
            // const path = location.pathname;
            // const whiteList =  ["/login","/index","/product","/detail", "/"]
            if (res.code == 0) {
                // 成功
                return res.data;
            } else if (res.code == 2) {
                // const flag = whiteList.some((ele)=>{
                //   return path.startsWith(ele)
                // })
                // if(flag) return Promise.reject(2);     //  没权限 403 放过来了
                // Message.warning({
                //   message:res.msg,
                //   center:true
                // });
                // router.push("/login?redirect=" + path);
                // 这玩意跳转太慢了，还要刷新界面
                umbrella.removeSessionStorage('jwt');
                umbrella.removeSessionStorage('user');
                window.location.href = '/';
                openNotificationWithIcon('warning');
                return Promise.reject(res.msg);
            } else {
                // Message.warning({
                //   message:res.msg,
                //   center:true
                // });
                Notify('warning',"网络出错",res.msg);
                return Promise.reject(res.msg);
            }
        },
        (err) => {
          Notify('warning',"网络出错","请检查网络是否通畅，或者联系管理员joeley@qq.com");
          return Promise.reject(err);
        }
    );

    return service;
}
