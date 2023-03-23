import { Content } from 'antd/es/layout/layout';
import React,{useState, useRef} from 'react';
import { Form, Input, Button, Layout, message, Select, DatePicker, Checkbox} from "antd";
import { useLocation } from 'react-router-dom';
import {CreateProductApi} from '../../request/api';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export default function AdminNewProduct() {

    const navigate = useNavigate()
    
    //回调
    const onSubmit = (values) => {
        console.log(values);
        const request = {
            productName: values.productName,
            productDesc: values.productDesc
        }
        CreateProductApi(request).then((res) => {
          if(res.code === 0){
            navigate(-1)
          }else{
            message.error(res.msg);
            navigate(-1)
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
                        name="create-product"
                        className="create-product"
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
                                style={{ height: "40px", borderRadius: "12px"}}
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
  


