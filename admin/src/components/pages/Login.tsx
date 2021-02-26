/**
 * Created by hao.cheng on 2017/4/16.
 */
import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { PwaInstaller, Notify } from '../widget';
import { useAlita } from 'redux-alita';
import { RouteComponentProps } from 'react-router';
import { FormProps } from 'antd/lib/form';
import umbrella from 'umbrella-storage';
import { GithubOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useUpdateEffect } from 'ahooks';

const FormItem = Form.Item;
type LoginProps = {
    setAlitaState: (param: any) => void;
    auth: any;
} & RouteComponentProps &
    FormProps;

const Login = (props: LoginProps) => {
    const { history } = props;
    const [auth, setAlita] = useAlita({ auth: {} }, { light: true });

    useEffect(() => {
        setAlita('auth', null);
    }, [setAlita]);

    useUpdateEffect(() => {
        if (auth && auth.uid) {
            // 判断是否登陆
            umbrella.setLocalStorage('user', auth);
        }
    }, [history, auth]);

    const handleSubmit = (values: any) => {
        setAlita({
            funcName: 'postAxios',
            params: {
                api: '/user/login',
                data: {
                    username: values.username,
                    password: values.password,
                },
            },
        })
            .then((res: any) => {
                res = res.data;
                const data = {
                    id: res.id,
                    permissions: [
                        'auth',
                        'auth/testPage',
                        'auth/authPage',
                        'auth/authPage/edit',
                        'auth/authPage/visit',
                    ],
                    role: res.role,
                    roleType: 1,
                    userName: res.username,
                };
                setAlita({ stateName: 'auth', data });
                umbrella.setSessionStorage('user', data);
                history.push('/');
            })
            .catch((res: any) => {
                console.log(res);
                umbrella.removeSessionStorage('jwt');
                umbrella.removeSessionStorage('user');
                Notify('error', '登录失败', res);
            });
    };

    return (
        <div className="login">
            <div className="login-form">
                <div className="login-logo">
                    <span>React Admin</span>
                    <PwaInstaller />
                </div>
                <Form onFinish={handleSubmit} style={{ maxWidth: '300px' }}>
                    <FormItem
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input
                            prefix={<UserOutlined size={13} />}
                            placeholder="管理员输入admin, 游客输入guest"
                        />
                    </FormItem>
                    <FormItem name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                        <Input
                            prefix={<LockOutlined size={13} />}
                            type="password"
                            placeholder="管理员输入admin, 游客输入guest"
                        />
                    </FormItem>
                    <FormItem>
                        <span className="login-form-forgot" style={{ float: 'right' }}>
                            忘记密码
                        </span>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ width: '100%' }}
                        >
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    );
};

export default Login;
