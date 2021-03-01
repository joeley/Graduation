/**
 * Created by joeley on 2020/2/26.
 */
import axiosTem from 'axios';
import { get as getTem, post as postTem } from './tools';
import * as config from './config';
import service from './interceptors';

export const getBbcNews = () => getTem({ url: config.NEWS_BBC });

export const npmDependencies = () =>
    axiosTem
        .get('./npm.json')
        .then((res) => res.data)
        .catch((err) => console.log(err));

export const weibo = () =>
    axiosTem
        .get('./weibo.json')
        .then((res) => res.data)
        .catch((err) => console.log(err));

export const gitOauthLogin = () =>
    getTem({
        url: `${config.GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`,
    });
export const gitOauthToken = (code: string) =>
    postTem({
        url: `https://cors-anywhere.herokuapp.com/${config.GIT_OAUTH}/access_token`,
        data: {
            client_id: '792cdcd244e98dcd2dee',
            client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
            redirect_uri: 'http://localhost:3006/',
            state: 'reactAdmin',
            code,
        },
    });
// {headers: {Accept: 'application/json'}}
export const gitOauthInfo = (access_token: string) =>
    getTem({ url: `${config.GIT_USER}access_token=${access_token}` });

// easy-mock数据交互
// 管理员权限获取
export const admin = () => getTem({ url: config.MOCK_AUTH_ADMIN });
// 访问权限获取
export const guest = () => getTem({ url: config.MOCK_AUTH_VISITOR });
/** 获取服务端菜单 */
export const fetchMenu = () => getTem({ url: config.MOCK_MENU });

type resParam = {
    api: string;
    data?: Object;
};

export const getAxios = (params: resParam) => {
    return service().get(params.api, params?.data);
};

export const postAxios = (params: resParam) => {
    return service().post(params.api, params?.data);
};

export const deleteAxios = (params: resParam) => {
    return service().delete(params.api, params?.data);
};

export const putAxios = (params: resParam) => {
  return service().put(params.api, params?.data);
};
