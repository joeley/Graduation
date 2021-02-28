import { Form, Input, Button, Select, InputNumber, Spin, Switch } from 'antd';
import React from 'react';
import { SingleImgUp, MultipleImgUp } from "../widget"
import BreadcrumbCustom from '../widget/BreadcrumbCustom';
import { getAxios, postAxios } from "../../service"
import { Notify } from '../widget';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class Demo extends React.PureComponent {
  formRef: {
    current: any;
  } = React.createRef();

  state = {
    defaultProductMainImage: "",
    categoryList: [],
    categoryFetching: false,
    productFlag: false,
    galleryFlag: false,
    videoFlag: false
  }



  onFinish = (values: any) => {
    postAxios({
      api: "/product",
      data: values
    })
      .then(() => {
        Notify('success', '成功', '恭喜你，商品成功上架');
      })
      .catch((err: string) => {
        Notify('error', '失败', err);
      });
  };

  onReset = () => {
    this.formRef.current.resetFields();
    this.setState({
      productFlag: false,
      galleryFlag: false,
      videoFlag: false
    })
  };
  // onFill = () => {
  //   this.formRef.current.setFieldsValue({
  //     note: 'Hello world!',
  //     gender: 'male',
  //   });
  // };


  onProductMainImage = (ele: string) => {
    this.formRef.current.setFieldsValue({ productMainImage: ele })
  }
  onDetailImg = (ele: string[]) => {
    for (let i = 1; i <= 4; i++) {
      this.formRef.current.setFieldsValue({ ["detailImg" + i]: "" });
    }
    const prop = Object.keys(ele)
    prop.map((name: any) => {
      const numName = Number(name) + 1;
      this.formRef.current.setFieldsValue({ ["detailImg" + numName]: ele[name] });
    });
  }

  onSetImgSrc = (fieldName: string, imgLength: number = 1) => (ele: string[]) => {
    if (imgLength === 1) {
      this.formRef.current.setFieldsValue({ [fieldName]: "" });
      this.formRef.current.setFieldsValue({ [fieldName]: ele[0] });
      return
    }
    for (let i = 1; i <= imgLength; i++) {
      this.formRef.current.setFieldsValue({ [fieldName + i]: "" });
    }
    const prop = Object.keys(ele)
    prop.map((name: any) => {
      const numName = Number(name) + 1;
      this.formRef.current.setFieldsValue({ [fieldName + numName]: ele[name] });
    });
  }

  onVideoSrc = (ele: string[]) => {
    for (let i = 1; i <= 1; i++) {
      this.formRef.current.setFieldsValue({ ["videoSrc" + i]: "" });
    }
    const prop = Object.keys(ele)
    prop.map((name: any) => {
      const numName = Number(name) + 1;
      this.formRef.current.setFieldsValue({ ["videoSrc" + numName]: ele[name] });
    });
  }
  onCategoryIdFocus = () => {
    if (this.state.categoryList.length === 0) {
      this.setState({ categoryFetching: true });
      getAxios({
        api: "/category",
      }).then((categoryList) => {
        this.setState({
          categoryList,
          categoryFetching: true
        })

      })
    }
  }

  onProductFlagChange = (checked: boolean, event: Event) => {
    this.formRef.current.setFieldsValue({ productFlag: checked ? 1 : 0 })
    this.setState({ productFlag: checked })
  }
  onGalleryFlagChange = (checked: boolean, event: Event) => {
    this.formRef.current.setFieldsValue({ galleryFlag: checked ? 1 : 0 })
    this.setState({ galleryFlag: checked })
  }
  onVideoFlagChange = (checked: boolean, event: Event) => {
    this.formRef.current.setFieldsValue({ videoFlag: checked ? 1 : 0 })
    this.setState({ videoFlag: checked })
  }

  render() {

    return (
      <>
        <BreadcrumbCustom breads={['商品管理', '添加商品']} />

        <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
          <Form.Item
            name="productName"
            label="商品"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="主图"
            required={true}
          >
            <Form.Item name="productMainImage" noStyle rules={[{ required: true }]}><Input hidden /></Form.Item>
            <SingleImgUp sendURL={this.onProductMainImage} imageUrl={this.state.defaultProductMainImage} />
          </Form.Item>

          <Form.Item
            name="productPrice"
            label="价格"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={0} step={0.01} />
          </Form.Item>

          <Form.Item
            name="productStock"
            label="库存"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={0} step={1} />
          </Form.Item>

          <Form.Item
            name="order"
            label="分类展示的排序权重"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber step={1} />
          </Form.Item>

          <Form.Item
            name="productStatus"
            noStyle
            initialValue={0}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input hidden />
          </Form.Item>

          <Form.Item
            name="productSubtitle"
            label="主推荐词"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tag"
            label="标签"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="tagColor"
            label="标签颜色"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="商品详情图（细拍照）"
            required={true}
          >
            <Form.Item name="detailImg1" noStyle rules={[{
              required: true,
              message: 'Send at least one detailImg',
            }]}><Input hidden /></Form.Item>
            <Form.Item name="detailImg2" noStyle ><Input hidden /></Form.Item>
            <Form.Item name="detailImg3" noStyle ><Input hidden /></Form.Item>
            <Form.Item name="detailImg4" noStyle ><Input hidden /></Form.Item>
            <MultipleImgUp sendURLs={this.onDetailImg} num={4} />
          </Form.Item>

          <Form.Item
            name="CategoryId"
            label="归属分类"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select the Category Display TAB"
              notFoundContent={this.state.categoryFetching ? <Spin size="default" /> : null}
              showSearch
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear
              onFocus={this.onCategoryIdFocus}
            >
              {
                this.state.categoryList.map((item: { id: number, describe: string }) => <Option value={item.id} key={item.id}>{item.describe}</Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item
            label="商品展示页开关"
            required={true}
          >
            <Form.Item name="productFlag" noStyle rules={[{ required: true }]} initialValue={0}><Input hidden /></Form.Item>
            <Switch checkedChildren="开启" unCheckedChildren="关闭" onChange={this.onProductFlagChange} checked={this.state.productFlag} />
          </Form.Item>


          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => {
              return prevValues.productFlag !== currentValues.productFlag
            }}
          >
            {({ getFieldValue }) => {
              const { productFlag } = this.state
              return getFieldValue('productFlag') === 1 ? (
                <>
                  <Form.Item
                    name="productDescribe1"
                    label="开头推荐语1"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="productDescribe2"
                    label="开头推荐语2"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="productDescribe3"
                    label="开头推荐语3"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="productDescribe4"
                    label="开头推荐语4"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="商品展示背景图"
                    required={productFlag}
                  >
                    <Form.Item name="productBg1" noStyle rules={[{
                      required: productFlag,
                      message: 'Send at least one ProductBackroundImg',
                    }]}><Input hidden /></Form.Item>
                    <Form.Item name="productBg2" noStyle ><Input hidden /></Form.Item>
                    <Form.Item name="productBg3" noStyle ><Input hidden /></Form.Item>
                    <Form.Item name="productBg4" noStyle ><Input hidden /></Form.Item>
                    <MultipleImgUp sendURLs={this.onSetImgSrc("productBg", 4)} num={4} />
                  </Form.Item>
                  <Form.Item
                    label="照片样张展示开关"
                    required={true}
                  >
                    <Form.Item name="galleryFlag" noStyle rules={[{ required: productFlag }]} initialValue={0}><Input hidden /></Form.Item>
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" onChange={this.onGalleryFlagChange} checked={this.state.galleryFlag} />
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => {
                      return prevValues.galleryFlag !== currentValues.galleryFlag
                    }}
                  >
                    {({ getFieldValue }) => {
                      const { galleryFlag } = this.state
                      return getFieldValue('galleryFlag') === 1 ? (
                        <>
                          <Form.Item
                            name="galleryText"
                            label="样张描述"
                            rules={[
                              {
                                required: false,
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="相片样张"
                            required={galleryFlag}
                          >
                            <Form.Item name="galleryImg1" noStyle rules={[{
                              required: galleryFlag,
                              message: 'Send at least one GalleryImg',
                            }]}><Input hidden /></Form.Item>
                            <Form.Item name="galleryImg2" noStyle ><Input hidden /></Form.Item>
                            <Form.Item name="galleryImg3" noStyle ><Input hidden /></Form.Item>
                            <Form.Item name="galleryImg4" noStyle ><Input hidden /></Form.Item>
                            <MultipleImgUp sendURLs={this.onSetImgSrc("galleryImg", 5)} num={5} />
                          </Form.Item>

                        </>) : null
                    }}
                  </Form.Item>
                  <Form.Item
                    label="视频推荐开关"
                    required={true}
                  >
                    <Form.Item name="videoFlag" noStyle rules={[{ required: productFlag }]} initialValue={0}><Input hidden /></Form.Item>
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" onChange={this.onVideoFlagChange} checked={this.state.videoFlag} />
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => {
                      return prevValues.videoFlag !== currentValues.videoFlag
                    }}
                  >
                    {({ getFieldValue }) => {
                      const { videoFlag } = this.state
                      return getFieldValue('videoFlag') === 1 ? (
                        <>
                          <Form.Item
                            label="视频上传"
                            required={videoFlag}
                          >
                            <Form.Item name="videoSrc" noStyle rules={[{
                              required: videoFlag,
                            }]}><Input hidden /></Form.Item>
                            <MultipleImgUp sendURLs={this.onSetImgSrc("videoSrc", 1)} num={1} />
                          </Form.Item>
                          <Form.Item
                            label="视频封面图片"
                            required={videoFlag}
                          >
                            <Form.Item name="videoCover" noStyle rules={[{
                              required: videoFlag,
                            }]}><Input hidden /></Form.Item>
                            <MultipleImgUp sendURLs={this.onSetImgSrc("videoCover", 1)} num={1} />
                          </Form.Item>
                          <Form.Item
                            name="videoMainTitleText1"
                            label="视频描述主显文本1"
                            rules={[
                              {
                                required: false,
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            name="videoMainTitleText2"
                            label="视频描述主显文本2"
                            rules={[
                              {
                                required: false,
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            name="videoSubheadText1"
                            label="视频描述副显文本1"
                            rules={[
                              {
                                required: false,
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            name="videoSubheadText2"
                            label="视频描述副显文本2"
                            rules={[
                              {
                                required: false,
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>

                        </>) : null
                    }}
                  </Form.Item>

                </>
              ) : null;
            }}
          </Form.Item>




          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
          </Button>
            <Button htmlType="button" onClick={this.onReset}>
              Reset
          </Button>
            {/* <Button type="link" htmlType="button" onClick={this.onFill}>
              Fill form
          </Button> */}
          </Form.Item>
        </Form>
      </>
    );
  }
}
export default Demo;
