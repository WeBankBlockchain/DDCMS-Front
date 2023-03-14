import { Content, Footer, Header } from 'antd/es/layout/layout';
import React,{useState} from 'react';
import { Form, Input, Button, Layout, message, Select, Tag } from "antd";

import { useLocation } from 'react-router-dom';
import {NewDataSchemaApi} from '../request/api';

const { Option } = Select;

export default function NewDataSchema() {
    
  
    //获取路由带过来的providerId
    const location = useLocation();

    //获取当前的did
    const productGid = location.state?.productGid;
    const {currUserDid, currUserPkId} = getCurrAccountInfo();
    const [tags, setTags] = useState([]);

    const handleInputPressEnter = (event) => {
        const value = event.target.value.trim();
        if (value) {
          const newTags = [...tags, value];
          setTags(newTags);
          event.target.value = '';
        }
      };
      
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
                            name=""
                            rules={[
                            { required: true, message: "请输入目录描述信息" },
                            { pattern: "^[^ ]+$", message: "密码不能有空格" },
                            ]}
                        >
                            <Input
                            bordered={false}
                            placeholder="请输入目录描述信息"
                            />
                        </Form.Item>
                        <Form.Item label="Tags">
                            <Input onPressEnter={handleInputPressEnter} />
                            {tags.map((tag) => (
                                <Tag key={tag} closable onClose={() => setTags(tags.filter((t) => t !== tag))}>
                                    {tag}
                                </Tag>
                            ))}
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
  

  function getCurrAccountInfo() {
    return {currUserDid: "111", currUserPkId: 1}
  }