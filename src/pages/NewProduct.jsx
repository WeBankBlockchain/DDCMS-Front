import { Content } from 'antd/es/layout/layout';
import React,{useState, useRef} from 'react';
import { Form, Input, Button, Layout, message, Select, DatePicker, Checkbox} from "antd";
import { useLocation } from 'react-router-dom';
import {createProductApi} from '../request/api';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export default function NewProduct() {
    //
  
    //获取路由带过来的providerId
    const location = useLocation();

    //获取当前环境各类id(todo)
    const providerGid = location.state?.providerGid;
    const {currUserDid, currUserPkId, currUserName} = getCurrAccountInfo();

    const navigate = useNavigate()

    //回调
    const onSubmit = (values) => {
        console.log(values);
        const request = {
            did: providerGid,
            productName: values.productName,
            productDesc: values.productDesc
        }
        createProductApi(request).then((res) => {
          if(res.code === 0){
            navigate('/product/detail', {
                state: {productId: res.data.productId}
            })
          }else{
            message.error(res.msg);
          }
        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        message.error("表单提交错误:");
      };
    //
    return (

        <Layout className="layout">
            <Content
                style={{
                width: "100%",
                padding: 30,
                minHeight: 800,
                alignItems: "center",
                margin: "0 auto",
                }}
            >
                    <div className="brain-form-page-title" >
                        <h1 > 创建产品 </h1>
                    </div>
                    <div className="brain-form-page-bg">

                    <div className="brain-form-page-main">
                        <Form
                        name="create-schema"
                        className="create-schema"
                        // initialValues={{}
                        onFinish={onSubmit}
                        onFinishFailed={onFinishFailed}
                        style={{
                            maxWidth: 700,
                            width: "100%",
                            padding: 30,
                            minHeight: 800,
                            alignItems: "center",
                            margin: "0 auto",
                            marginTop: 30,
                        }}
                        >
                            <Form.Item
                                name="productName"
                                rules={[
                                { required: true, message: "请输入产品名称" },
                                { pattern: "^[^ ]+$", message: "不能有空格" },
                                ]}
                            >
                                <Input placeholder="请输入产品名称" />
                            </Form.Item>
                            <Form.Item
                                name="productDesc"
                                rules={[
                                { required: true, message: "请输入产品描述信息" },
                                { pattern: "^[^ ]+$", message: "不能有空格" },
                                ]}
                            >
                                <Input
                                
                                placeholder="请输入产品描述信息"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{ height: "40PX", borderRadius: "12PX"}}
                                >
                                创建产品
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Content>
        </Layout>            
    )
  }
  
  function renderDropdown(placeholder, options) {
    return (
      <>
        <div style={{ paddingLeft: '8px', color: 'rgba(0, 0, 0, 0.25)' }}>{placeholder}</div>
        {options}
      </>
    );
  }
  
  function getCurrAccountInfo() {
    //TODO
    return {currUserDid: "111", currUserPkId: 1, currUserName: '阿里'}
  }

