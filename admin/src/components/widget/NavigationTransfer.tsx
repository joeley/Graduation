import React, { useEffect, useState } from 'react';
import { Transfer } from 'antd';
import { getAxios, postAxios, putAxios} from "../../service"
import { Notify } from '../widget';


let allProduct: any[]= [];
const getAllProduct = async()=>{
  return getAxios({
    api: "/product/query/simple"
  }).then((ele: any)=>{
    allProduct = ele.map((item:any)=>{
       item.key = item.id
       return item
    })
    console.log(allProduct)
  })
}

const NavigationTransfer = (props:{id:number}) => {
  const [selectedProduct, setSelectedProduct] = useState<any[]>([]);
  const [targetIds, setTargetIds] = useState<any[]>([]);

  const refresh = ()=>{
    getAxios({
      api: "/navigation/" + props.id
    }).then((ele:any)=>{
      setSelectedProduct(ele)
    })
  }

  useEffect(() => {
    if(allProduct.length<=0){
      getAllProduct().catch((err: string) => {
        Notify('error', '初始化失败', err);
      });
    }
    refresh()
  },[])

  useEffect(() => {
    const targetTep: any= []
    selectedProduct.map((ele: any)=>{
      targetTep.push(ele.id)
    })

    setTargetIds(targetTep)
  },[selectedProduct,allProduct])

  const onChange = (nextTargetKeys:string[], direction:string, moveKeys:string) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    if(moveKeys.length <= 0){
      return
    }
    if(direction==="right"){
      putAxios({
        api: "/navigation/" + props.id,
        data:{
          type: "add",
          list:moveKeys
        }
      }).then(() => {
        setTargetIds(nextTargetKeys)
      }).catch((err)=>{
        Notify("warning","失败",err)
      })
    }else{
      putAxios({
        api: "/navigation/" + props.id,
        data:{
          type: "decrease",
          list:moveKeys
        }
      }).then(() => {
        setTargetIds(nextTargetKeys)
      }).catch((err)=>{
        Notify("warning","失败",err)
      })
    }

    // setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: any, targetSelectedKeys:any) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    // @ts-ignore
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };
  // @ts-ignore
  const onScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  console.log(targetIds);
  return (
    <Transfer
    // dataSource={mockData}
    dataSource={allProduct}
    titles={['全部', '已加入']}
      targetKeys={targetIds}
      // selectedKeys={selectedKeys}
      // @ts-ignore
      onChange={onChange}
      // onSelectChange={onSelectChange}
      // onScroll={onScroll}
      // @ts-ignore
      render={item => item.productName}
      showSearch
      listStyle={{
        width: 400,
        height: 400,
      }}
      style={{
        width: 600,
        height: 500,
        margin:"0 auto 0 auto",

      }}
    />
  );
};

export default NavigationTransfer