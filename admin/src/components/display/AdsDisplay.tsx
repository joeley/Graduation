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
   <BreadcrumbCustom breads={['展示位管理',"广告区"]} />
    <Collapse defaultActiveKey={[]} >
      <Panel header="中部广告位1" key="1">
        <DisplayForm type="ads" order={1} />
      </Panel>
      <Panel header="中部广告位1" key="2">
        <DisplayForm type="ads" order={2} />
      </Panel>
      <Panel header="中部广告位3" key="3">
        <DisplayForm type="ads" order={3} />
      </Panel>
      <Panel header="中部广告位4" key="4">
        <DisplayForm type="ads" order={4} />
      </Panel>
    </Collapse>
  </>
}
export default AdsDisplay