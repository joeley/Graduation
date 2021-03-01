import React from 'react';

import { Collapse} from 'antd';

import { DisplayForm } from '../widget'
import BreadcrumbCustom from '../widget/BreadcrumbCustom';



const { Panel } = Collapse;







// function callback(key: any) {
//   console.log(key);
// }



const MainDisplay = () => {
  return <>
  <BreadcrumbCustom breads={['展示位管理',"主推区"]} />
    <Collapse defaultActiveKey={['1']} >
      <Panel header="主推产品展示位" key="1">
        <DisplayForm type="main" order={1} />
      </Panel>
    </Collapse>
  </>
}
export default MainDisplay