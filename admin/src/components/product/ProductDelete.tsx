/**
 * Created by joeley on 2020/2/26.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Table, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { useAlita } from 'redux-alita';
import { Notify } from '../widget';

const ProductAdd = () => {
    const [, setAlita] = useAlita('getAxios');
    const [data, setData] = useState([]);
    const [deleteID, setDeleteID] = useState(undefined);

    useEffect(() => {
        setAlita({
            funcName: 'getAxios',
            params: {
                api: '/product/query',
            },
        }).then((res: any) => {
            setData(res?.data || []);
        });
    }, []);

    useEffect(() => {
        if(deleteID === undefined) return;
        setAlita({
            funcName: 'deleteAxios',
            params: {
                api: '/product/' + deleteID,
            },
        })
            .then(() => {
                const newData:any = data.map((ele:any)=>{
                  if(ele.id === deleteID){
                    ele.status = false
                  }
                  return ele
                })
                setData(newData)
                Notify('success', '成功', '成功删除该用户');
            })
            .catch((err: string) => {
                console.log(err);
                Notify('error', '失败', err);
            });
    }, [deleteID]);

    const columns = useRef([
        {
            title: '商品',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: <span style={{ color: 'red' }}>{'ID'}</span>,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '价格',
            dataIndex: 'productPrice',
            key: 'productPrice',
        },
        {
            title: '主图',
            dataIndex: 'productMainImage',
            key: 'productMainImage',
            render: (src: any) => (
                <span>
                    <img src={src} style={{ width: '50px', height: '50px' }} alt="" />
                </span>
            ),
        },
        {
            title: '库存',
            dataIndex: 'productStock',
            key: 'productStock',
        },
        {
            title: '主推荐词',
            dataIndex: 'productSubtitle',
            key: 'productSubtitle',
        },
        {
            title: '标签',
            dataIndex: 'tag',
            key: 'tag',
        },
        {
            title: '标签颜色',
            dataIndex: 'tagColor',
            key: 'tagColor',
            render: (color: any) => (
                <div
                    style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: color,
                    }}
                ></div>
            ),
        },
        // {
        //   title: '商品页开关',
        //   dataIndex: 'productFlag',
        //   key: 'productFlag',
        //   render: (flag):any => flag === 1 ? "开启" : "关1闭"
        // },
        {
            title: '详情图1',
            dataIndex: 'detailImg1',
            key: 'detailImg1',
            render: (src: any) =>
                !!src ? (
                    <span>
                        <img src={src} style={{ width: '60px', height: '50px' }} alt="" />
                    </span>
                ) : null,
        },
        {
            title: '详情图2',
            dataIndex: 'detailImg2',
            key: 'detailImg2',
            render: (src: any) =>
                !!src ? (
                    <span>
                        <img src={src} style={{ width: '60px', height: '50px' }} alt="" />
                    </span>
                ) : null,
        },
        {
            title: '详情图3',
            dataIndex: 'detailImg3',
            key: 'detailImg3',
            render: (src: any) =>
                !!src ? (
                    <span>
                        <img src={src} style={{ width: '60px', height: '50px' }} alt="" />
                    </span>
                ) : null,
        },
        {
            title: '详情图4',
            dataIndex: 'detailImg4',
            key: 'detailImg4',
            render: (src: any) =>
                !!src ? (
                    <span>
                        <img src={src} style={{ width: '60px', height: '50px' }} alt="" />
                    </span>
                ) : null,
        },
        {
            title: '商品排序',
            dataIndex: 'order',
            key: 'order',
        },
        {
            title: '商品状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: any) =>
                status ? (
                    <span style={{ backgroundColor: 'green', color: 'white' }}>在售</span>
                ) : (
                    <span style={{ backgroundColor: 'red', color: 'white' }}>下架</span>
                ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text: any, record: any, a: any) => (
                <span>
                    <Button onClick={()=>{
                      setDeleteID(record.id)
                    }}
                    disabled={!record.status}
                  >Sold Out {record.name}</Button>
                </span>
            ),
        },
    ]);
    const product = useRef([
        {
            title: '开头描述1',
            dataIndex: 'productDescribe1',
            key: 'productDescribe1',
        },
        {
            title: '开头描述2',
            dataIndex: 'productDescribe2',
            key: 'productDescribe1',
        },
        {
            title: '开头描述3',
            dataIndex: 'productDescribe3',
            key: 'productDescribe3',
        },
        {
            title: '开头描述4',
            dataIndex: 'productDescribe4',
            key: 'productDescribe4',
        },
        {
            title: '主展示图1',
            dataIndex: 'productBg1',
            key: 'productBg1',
            render: (src: any) =>
                !!src === true ? (
                    <span>
                        <img src={src} style={{ width: '100px', height: '70px' }} alt="" />
                    </span>
                ) : null,
        },
        {
            title: '主展示图2',
            dataIndex: 'productBg2',
            key: 'productBg2',
            render: (src: any) =>
                !!src === true ? (
                    <span>
                        <img src={src} style={{ width: '100px', height: '70px' }} alt="" />
                    </span>
                ) : null,
        },
        {
            title: '主展示图3',
            dataIndex: 'productBg3',
            key: 'productBg3',
            render: (src: any) =>
                !!src === true ? (
                    <span>
                        <img src={src} style={{ width: '100px', height: '70px' }} alt="" />
                    </span>
                ) : null,
        },
        {
            title: '主展示图4',
            dataIndex: 'productBg4',
            key: 'productBg4',
            render: (src: any) =>
                !!src === true ? (
                    <span>
                        <img src={src} style={{ width: '100px', height: '70px' }} alt="" />
                    </span>
                ) : null,
        },
        {
            title: '照片样张开关',
            dataIndex: 'galleryFlag',
            key: 'galleryFlag',
            render: (flag): any => (flag === 1 ? '开启' : '关闭'),
        },
        {
            title: '样张描述',
            dataIndex: 'galleryText',
            key: 'galleryText',
        },
        {
            title: '样张1',
            dataIndex: 'galleryImg1',
            key: 'galleryImg1',
            render: (src: any) =>
                !!src === true ? (
                    <span>
                        <img src={src} style={{ width: '100px', height: '70px' }} alt="" />
                    </span>
                ) : null,
        },
        {
            title: '样张2',
            dataIndex: 'galleryImg2',
            key: 'galleryImg2',
            render: (src: any) =>
                !!src === true ? (
                    <span>
                        <img src={src} style={{ width: '100px', height: '70px' }} alt="" />
                    </span>
                ) : null,
        },
        {
            title: '样张3',
            dataIndex: 'galleryImg3',
            key: 'galleryImg3',
            render: (src: any) =>
                !!src === true ? (
                    <span>
                        <img src={src} style={{ width: '100px', height: '70px' }} alt="" />
                    </span>
                ) : null,
        },
        {
            title: '样张4',
            dataIndex: 'galleryImg4',
            key: 'galleryImg4',
            render: (src: any) =>
                !!src === true ? (
                    <span>
                        <img src={src} style={{ width: '100px', height: '70px' }} alt="" />
                    </span>
                ) : null,
        },
        {
            title: '样张5',
            dataIndex: 'galleryImg5',
            key: 'galleryImg5',
            render: (src: any) =>
                !!src === true ? (
                    <span>
                        <img src={src} style={{ width: '100px', height: '70px' }} alt="" />
                    </span>
                ) : null,
        },
        {
            title: '主推视频开关',
            dataIndex: 'videoFlag',
            key: 'videoFlag',
            render: (flag): any => (flag === 1 ? '开启' : '关闭'),
        },
        {
            title: '视频',
            dataIndex: 'videoSrc',
            key: 'videoSrc',
            render: (src: any) => (
                <span>
                    <video src={src} width={'120px'} height={'80px'} controls />
                </span>
            ),
        },
        {
            title: '视频封面',
            dataIndex: 'videoCover',
            key: 'videoCover',
            render: (src: any) =>
                !!src === true ? (
                    <span>
                        <img src={src} style={{ width: '100px', height: '70px' }} alt="" />
                    </span>
                ) : null,
        },
        {
            title: '视频主显文本1',
            dataIndex: 'videoMainTitleText1',
            key: 'videoSrc',
        },
        {
            title: '视频主显文本2',
            dataIndex: 'videoMainTitleText2',
            key: 'videoMainTitleText2',
        },
        {
            title: '视频副显文本1',
            dataIndex: 'videoSubheadText1',
            key: 'videoSubheadText1',
        },
        {
            title: '视频副显文本2',
            dataIndex: 'videoSubheadText2',
            key: 'videoSubheadText2',
        },
        // {
        //   title: '商品页描述2',
        //   dataIndex: 'productDescribe2',
        //   key: 'productDescribe2',
        // },
        // {
        //   title: '商品页描述3',
        //   dataIndex: 'productDescribe3',
        //   key: 'productDescribe3',
        // },
        // {
        //   title: '商品页描述4',
        //   dataIndex: 'productDescribe4',
        //   key: 'productDescribe4',
        // },
    ]);

    return data.length == 0 ? null : (
        <>
            <Table
                pagination={{
                    defaultPageSize: 5,
                }}
                scroll={{ x: 'max-content' }}
                columns={columns.current.map((item: any) => {
                    // 通过配置 给每个单元格添加不换行属性
                    const fun = () => ({ style: { whiteSpace: 'nowrap' } });
                    item.onHeaderCell = fun;
                    item.onCell = fun;
                    return item;
                })}
                dataSource={data}
                rowKey={'id'}
                expandable={{
                    expandedRowRender: (record: any) => {
                        return (
                            <>
                                <Table
                                    bordered
                                    tableLayout="fixed"
                                    title={() => '商品展示页详细参数'}
                                    // scroll={{y: "100vw",x:"5000px"}}
                                    // bordered={false}
                                    size={'small'}
                                    columns={product.current.map((item: any) => {
                                        // 通过配置 给每个单元格添加不换行属性
                                        const fun = () => ({
                                            style: {
                                                width: '150px',
                                                height: '80',
                                                textAlign: 'center',
                                            },
                                        });
                                        item.onHeaderCell = fun;
                                        item.onCell = fun;
                                        return item;
                                    })}
                                    dataSource={record.productPage}
                                    rowKey={'key'}
                                    pagination={false}
                                ></Table>
                            </>
                        );
                    },
                    rowExpandable: (record) => record.productFlag !== 0,
                }}
            />
        </>
    );
};

export default ProductAdd;
