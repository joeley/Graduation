/**
 * Created by joeley on 2020/2/26.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Table, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useAlita } from 'redux-alita';
import { Notify } from '../widget';
import BreadcrumbCustom from '../widget/BreadcrumbCustom';

// type user = {
//     id:number
//     username: string
//     phone: string
//     vip:number
// }

const User = () => {
    const [, setAlita] = useAlita('getAxios');
    const [data, setData] = useState([]);

    const columns = useRef([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text: any) => <span>{text}</span>,
        },
        {
            title: 'UserName',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'VIP',
            dataIndex: 'vip',
            key: 'vip',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text: any, record: any, a: any) => (
                <span>
                    <Button
                        onClick={() => {
                            setAlita({
                                funcName: 'deleteAxios',
                                params: {
                                    api: '/user/' + record.id,
                                },
                            })
                                .then(() => {
                                    const newData = data.filter((ele: any) => {
                                        return ele.id !== record.id;
                                    });
                                    setData(newData);
                                    Notify('success', '成功', '成功删除该用户');
                                })
                                .catch((err: string) => {
                                    console.log(err);
                                    Notify('error', '失败', err);
                                });
                        }}
                    >
                        Delete {record.name}
                    </Button>
                </span>
            ),
        },
    ]);

    useEffect(() => {
        setAlita({
            funcName: 'getAxios',
            params: {
                api: '/user/query',
                params: {
                    param: {
                        page: 1,
                        limit: 2,
                    },
                },
            },
        }).then((res: any) => {
            setData(res?.data?.userList || []);
        });
    }, []);

    return data.length == 0 ? null : (
        <>
          <BreadcrumbCustom breads={['用户管理']} />

            <Table
                columns={columns.current}
                dataSource={data}
                rowKey={'id'}
                pagination={
                    {
                        // // hideOnSinglePage: true,
                        // defaultPageSize:9,
                        // // showSizeChanger:true,
                        // current:page,
                        // showTitle: true,
                        // onShowSizeChange:(page, pageSize) => {
                        //     console.log(page, pageSize);
                        // },
                        // onChange:(current, size) => {
                        //     setpage(current);
                        //     console.log(current,size);
                        // }
                    }
                }
            />
        </>
    );
};

export default User;
