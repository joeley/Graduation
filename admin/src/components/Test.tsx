import React, { useEffect, useRef, useState } from 'react';
import { NavigationTransfer } from './widget'
import { getAxios, postAxios, putAxios} from "./../service"


import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormListFieldData, FormListOperation } from 'antd/lib/form/FormList';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const DynamicFieldSet = () => {
  const formRef: any=  useRef();
  const onFinish = (values:any) => {
    console.log('Received values of form:', values);
  };
  // @ts-ignore
  return (
    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}
      ref={formRef}
      initialValues={{"name": [1]}}
    >
      
      <Form.List
        name="name"
        // @ts-ignore
        rules={[
          {
            validator: async (_: any, names:any) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('At least 2 passengers'));
              }
            },
          }
        ]}
      >
        {(fields:FormListFieldData[], { add, remove }:FormListOperation) => {
          console.log(fields)
         return(
          <>   
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Passengers' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="passenger name" style={{ width: '60%' }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => {
                      remove(field.name)
                      formRef.current.setFields([{name: "joe", key: 0, isListField: true, fieldKey: 0}])
                      console.log(formRef);
                      console.log(fields);
                    }}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
            {fields.length < 7 ? (
              <Button
              type="dashed"
              onClick={() => add()}
              style={{ width: '60%' }}
              icon={<PlusOutlined />}
            >
              Add field
            </Button>
                ) : null}
              {/* <Button
                type="dashed"
                onClick={() => {
                  add('The head item', 0);
                }}
                style={{ width: '60%', marginTop: '20px' }}
                icon={<PlusOutlined />}
              >
                Add field at head
              </Button> */}
            </Form.Item>
          </>
        )
      }
      }
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

// ReactDOM.render(<DynamicFieldSet />, mountNode);


export default DynamicFieldSet