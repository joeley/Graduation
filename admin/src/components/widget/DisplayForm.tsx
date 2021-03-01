import React, { useEffect, useRef, useState } from 'react';
import { Collapse, Form, Input, Button, Checkbox, Card, Layout, Select, Spin} from 'antd';
import { MultipleImgUp } from "../widget"
import { getAxios, postAxios, putAxios } from "../../service"
import { Notify } from '../widget';


const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select

const { Panel } = Collapse;

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 12,
  },
};

type displayFormProp = {
  type: "ads" | "new" | "swiper" | "main"
  order: number
}
const DisplayForm = (props: displayFormProp)=> {
  const [productList, setProductList] = useState([])
  const [productObj, setProductObj] = useState({
    displaySrc: "",
    productName: ""
  })
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    getAxios({
      api:"/display/?type=" + props.type + "&order=" + props.order
    }).then((ele: any) => {
      setProductObj(ele)
    })
      .catch((err: string) => {
        Notify('error', '失败', err);
      });
  }, [])

  const formRef: { current: any } = useRef();
  const onFinish = (values: any) => {
    putAxios({
      api:"/display",
      data:{
        type:props.type,
        order: props.order,
        ...values
      }
    }).then((ele: any) => {
      const tem:any = productList.find((ele:any)=>ele.id === values.ProductId)
      setProductObj({
        productName: tem.productName, 
        displaySrc:values.displaySrc
      })
      Notify("success", '成功', "该展示位修改成功");
    })
      .catch((err: string) => {
        Notify('error', '失败', err);
      });
  };
  const onSetImgSrc = (fieldName: string, imgLength: number = 1) => (ele: string[]) => {
    if (imgLength === 1) {
      formRef.current.setFieldsValue({ [fieldName]: "" });
      formRef.current.setFieldsValue({ [fieldName]: ele[0] });
      return
    }
    for (let i = 1; i <= imgLength; i++) {
      formRef.current.setFieldsValue({ [fieldName + i]: "" });
    }
    const prop = Object.keys(ele)
    prop.map((name: any) => {
      const numName = Number(name) + 1;
      formRef.current.setFieldsValue({ [fieldName + numName]: ele[name] });
    });
  }

  const onCategoryIdFocus = () => {
    if (productList.length === 0) {
      setFetching(true);
      getAxios({
        api: "/product/query/simple"
      }).then((ele: any) => {
        setProductList(ele)
        setFetching(false)
      })
        .catch((err: string) => {
          Notify('error', '加载商品列表失败', err);
          setFetching(false)
        });
    }
  }
  return (<>
    <Layout>
      <Content>
        <Form
          ref={formRef}
          {...layout}
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item>

          </Form.Item>
          <Form.Item
            label=" "
            required={true}
          >
            <Form.Item name="displaySrc" noStyle rules={[{
              required: true,
              message: 'Send at least one ProductBackroundImg',
            }]}>
              <Input hidden />
            </Form.Item>
            <MultipleImgUp sendURLs={onSetImgSrc("displaySrc", 1)} num={1} />
          </Form.Item>

          <Form.Item
            name="ProductId"
            label="关联商品"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select the Category Display TAB"
              notFoundContent={fetching ? <Spin size="default" /> : null}
              showSearch
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear
              onFocus={onCategoryIdFocus}
            >
              {
                productList.map((item: { id: number, productName: string }) => <Option value={item.id} key={item.id}>{item.productName}</Option>)
              }
            </Select>
          </Form.Item>
          
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ width: "102px" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Content>
      <Sider width="30%" >
        <Card
          hoverable
          style={{ width: "100%", height: "300px" }}
          cover={productObj?.displaySrc ? <img alt="example" height="250px" src={productObj.displaySrc} /> : <div><div style={{textAlign: "center"}}>此展示位没有启用</div><div style={{textAlign: "center"}}>你可以上传启用该展示位</div></div> }
        >
          <Meta title={productObj?.displaySrc ? productObj.productName : null} style={{ height: "50px" }} />
        </Card>
      </Sider>
    </Layout>
  </>)

}

export default DisplayForm