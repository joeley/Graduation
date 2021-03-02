import React, { useEffect, useState } from 'react';
import { NavigationTransfer } from '../widget'
import { getAxios, postAxios, putAxios} from "../../service"


import { Tabs } from 'antd';
import BreadcrumbCustom from '../widget/BreadcrumbCustom';
const { TabPane } = Tabs;

const SetProduct = () =>{
  const [navList, setNavList] = useState<any[]>([])
  useEffect(() =>{
    getAxios({
      api:"/navigation/query/simple"
    }).then((ele:any)=>{
      setNavList(ele)
    })
  },[])
  return (
    <>
    <BreadcrumbCustom breads={['导航管理', '编辑导航商品']} />
    <Tabs defaultActiveKey="1" centered>
      {
        navList.map((ele)=>(
          <TabPane tab={ele.navName} key={ele.id}>
            <NavigationTransfer id={ele.id}/>
          </TabPane>
        ))
      }
    </Tabs>
    </>
  )
} 


export default SetProduct