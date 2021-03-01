import React from 'react';

import { Collapse} from 'antd';

import { DisplayForm } from '../widget'
import BreadcrumbCustom from '../widget/BreadcrumbCustom';



const { Panel } = Collapse;







// function callback(key: any) {
//   console.log(key);
// }



const AdsDisplay = () => {
  return <>
  <BreadcrumbCustom breads={['展示位管理',"轮播区"]} />
    <Collapse defaultActiveKey={[]} >
      <Panel header="主页录播图展示位1" key="1">
        <DisplayForm type="swiper" order={1} />
      </Panel>
      <Panel header="主页录播图展示位2" key="2">
        <DisplayForm type="swiper" order={2} />
      </Panel>
      <Panel header="主页录播图展示位3" key="3">
        <DisplayForm type="swiper" order={3} />
      </Panel>
      <Panel header="主页录播图展示位4" key="4">
        <DisplayForm type="swiper" order={4} />
      </Panel>
      <Panel header="主页录播图展示位5" key="5">
        <DisplayForm type="swiper" order={5} />
      </Panel>
    </Collapse>
  </>
}
export default AdsDisplay