import axios from 'axios';
import umbrella from 'umbrella-storage';
import { notification } from 'antd';
import { IconType, ConfigProps } from 'antd/lib/notification';

const openNotificationWithIcon = (type: IconType) => {
    notification[type]({
        message: '权限不够',
        description: '您的登录失效，或者账号权限不够，\n请重新登录,已经为你跳转页面',
    });
};

export default function () {
    const token = umbrella.getSessionStorage('jwt');
    axios.defaults.timeout = 8000;

    const service = axios.create({
        baseURL: '/admin',
        timeout: 8000,
        headers: {
            token: token ? 'bearer ' + token : '',
        },
    });

    service.interceptors.response.use(
        (response) => {
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
                return Promise.reject(res.msg);
            }
        },
        (err) => {
            // const res = err.response
            // if(res.status === 403){
            //   // 这里用不上了
            //   // const path = location.pathname;
            //   // if(path =='/login') return;
            //   // if(path !='/login'){
            //   //   Message.warning({
            //   //     message:res.data.msg,
            //   //     center:true
            //   //   });
            //   //   router.push("/login?redirect=" + path);
            //   //   // 这玩意跳转太慢了，还要刷新界面
            //   //   // window.location.href = "/login?redirect=" + path;
            //   //   return Promise.reject(res);
            //   // }
            // }else{
            //   let msg = res.data.msg||err.message;
            //   // Message.error(msg);
            //   return Promise.reject(err);
            // }
        }
    );

    return service;
}
