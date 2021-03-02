import React, { useEffect, useRef, useState } from 'react';
import { getAxios, postAxios, putAxios } from "../../service"
import { useAlita } from 'redux-alita';

import { Table, Tag, Space, Button, Modal, Input } from 'antd';
import { Notify } from '../widget';
import BreadcrumbCustom from '../widget/BreadcrumbCustom';
const { Column, ColumnGroup } = Table;


interface navigationType {
  id: number
  navName: string
}
interface updataType {
  type: "add" | "updata"
  id?: number
  navName: string
}


const SetNavigation = () => {
  const [, setAlita] = useAlita('getAxios');
  const [data, setData] = useState<navigationType[]>([])
  const [updata, setUpdata] = useState<updataType>({ id: 0, type: "add", navName: "" })
  const [deleteID, setDeleteID] = useState<navigationType>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>();

  const addShowModal = () => {
    if (data.length >= 7) {
      Notify("warning", "警告", "为了用户端样式考虑，请控制添加的导航个数在8个左右!")
    }
    setUpdata({ type: "add", navName: "" })
    setIsModalVisible(true);
  };
  const updataShowModal = (id: number, navName: string = "") => {
    setInputValue(navName)
    setUpdata({ type: "updata", id, navName })
    setIsModalVisible(true);
  };
  const [,forceupdate] = useState()
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSuccess = () => {
    if (updata?.type === "add") {
      postAxios({
        api: "/navigation",
        data: {
          navName: inputValue
        }
      }).then((ele: any) => {
        setData([...data, {
          id: ele.id,
          navName: ele.navName
        }]);
        setIsModalVisible(false);
        Notify('success', '成功', '成功添加导航');
      }).catch((err: any) => {
        Notify("warning", "添加失败", err)
      })
    } else if (updata?.type === "updata") {
      putAxios({
        api: "/navigation/set",
        data: {
          id: updata.id,
          navName: inputValue
        }
      }).then((ele: any) => {
        const newData = data.map((item: any) => {
          if (item.id === updata.id) {
            item.navName = inputValue
          }
          return item;
        })
        setData(newData)
        setIsModalVisible(false);
        Notify('success', '成功', '成功修改导航');
      }).catch((err: any) => {
        Notify("warning", "修改失败", "err")
      })
    }


  }

  const columns = useRef([
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'navName',
      key: 'navName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any, a: any) => (
        <span>
          <Button type={"ghost"} onClick={() => {
            setDeleteID(record.id)
          }}
          > Delete</Button>
          <Button onClick={() => {
            updataShowModal(record.id, record.navName)
          }}
          > Updata</Button>

        </span>
      ),
    },
  ])
  useEffect(() => {
    setAlita({
      funcName: 'getAxios',
      params: {
        api: '/navigation/query/simple',
      },
    }).then((res: any) => {
      setData(res?.data || []);
      console.log(22222);
    });
  }, []);

  useEffect(() => {
    if (deleteID === undefined) return;
    setAlita({
      funcName: 'deleteAxios',
      params: {
        api: '/navigation/' + deleteID,
      },
    })
      .then(() => {
        const newData: any = data.filter((ele: any) => {
          return ele.id !== deleteID
        })
        setData(newData)
        Notify('success', '成功', '成功删除该导航');
      })
      .catch((err: string) => {
        Notify('error', '失败', err);
      });
  }, [deleteID]);

  // useEffect(() =>{
  //   if(updata === undefined){
  //     return
  //   }

  // },[updata])

  return <>
    <BreadcrumbCustom breads={['导航管理', '设置导航']} />
    {/* <App type="add" isModalVisible={isModalVisible}
  /> */}
    <Button type="primary" onClick={addShowModal}>
      Add
  </Button>
    <Table
      dataSource={data}
      columns={columns.current}
      rowKey={"id"}
    >

    </Table>
    <Modal title={updata.type === "updata" ? "修改ID为【" + updata.id + "】的导航" :  "增加导航" } 
      visible={isModalVisible} 
      onOk={handleSuccess} 
      onCancel={handleCancel}
    >
      <Input type="text" value={inputValue} onChange={(e) => {
        setInputValue(e.target.value)
        setUpdata({
          ...updata,
          navName: e.target.value
        })
      }} />
    </Modal>
  </>
}

export default SetNavigation