import { Content, Footer, Header } from 'antd/es/layout/layout';
import React from 'react';
import { Form, Input, Button, Layout, message } from "antd";

import { useLocation } from 'react-router-dom';
import {NewDataSchemaApi} from '../request/api';

export default function NewDataSchema() {
    
  
    //获取路由带过来的providerId
    const location = useLocation();
    
    
    return (
        <Layout>
            <Content
                style={{
                width: "100%",
                padding: 30,
                minHeight: 800,
                alignItems: "center",
                margin: "0 auto",
                }}
            >
                <div className="brain-form-page-bg">
                    <div className="brain-form-page-title">
                        <h1> 创建数据目录 </h1>
                    </div>
                    <div className="brain-form-page-main">
                        <Form
                        name="create-schema"
                        className="create-schema"
                        initialValues={{ remember: true }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        style={{
                            maxWidth: 600,
                        }}
                        >
                        <Form.Item
                            name="schema-name"
                            rules={[
                            { required: true, message: "请输入数目目录名称" },
                            { pattern: "^[^ ]+$", message: "名称不能有空格" },
                            ]}
                        >
                            <Input placeholder="请输入数据目录名称" bordered={false} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                            { required: true, message: "请输入密码!" },
                            { pattern: "^[^ ]+$", message: "密码不能有空格" },
                            ]}
                        >
                            <Input
                            bordered={false}
                            type="password"
                            placeholder="请输入密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <a href="register">创建账号</a>
                        </Form.Item>

                        <Form.Item>
                            <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{ height: "40PX", borderRadius: "12PX" }}
                            >
                            登录
                            </Button>
                        </Form.Item>
                        </Form>
                    </div>
                </div>
            </Content>
        </Layout>            
    )
  }
  