import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { Form, Input, Button, Layout, message, Divider} from "antd";
import {CreateProductApi} from '../../request/api';
import { useNavigate } from 'react-router-dom';
import "../../assets/AdminNewProduct.css";


export default function AdminNewProduct() {
    const navigate = useNavigate()
    
    //回调
    const onSubmit = async (values) => {
        console.log(values);
        const request = {
            productName: values.productName,
            productDesc: values.productDesc
        }
        const res = await CreateProductApi(request);

        if(res.code === 0){
            message.info("创建成功，审核中");
            setTimeout(()=>navigate(-1), 2000);
        }else{
            message.error(res.msg);
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        message.error("表单提交错误:");
        
      };
    //
    return (
        <div className="create-bg">
            <div className='create-main'>
                <h1> 创建业务 </h1>
                <Divider></Divider>
                <Form
                      labelCol={{
                        span:24
                      }}
                        name="create-product"
                        className="create-product"
                        // initialValues={{}
                        onFinish={onSubmit}
                        onFinishFailed={onFinishFailed}
                        style={{
                            width: '80%'
                        }}
                        size='large'
                        >
                            <Form.Item
                                label='业务名称'
                                name="productName"
                                rules={[
                                { required: true, message: "请输入业务名称" },
                                { pattern: "^[^ ]+$", message: "不能有空格" },
                                ]}
                            >
                                <Input placeholder="请输入业务名称" />
                            </Form.Item>
                            <Form.Item
                                label='业务说明'
                                name="productDesc"
                                rules={[
                                { required: true, message: "请输入业务描述信息" },
                                { pattern: "^[^ ]+$", message: "不能有空格" },
                                ]}
                            >
                                <Input.TextArea
                                placeholder="请输入业务描述信息"
                                />
                            </Form.Item>

                            <Form.Item
                                style={{
                                    margin:'auto'
                                }}
                            >
                                <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{ height: "40px", borderRadius: "4px",}}
                                >
                                创建业务
                                </Button>
                            </Form.Item>
                        </Form>
            </div>
        </div>         
    )
  }
  


