import { Content, Footer, Header } from 'antd/es/layout/layout';
import React,{useState, useRef} from 'react';
import { Form, Input, Button, Layout, message, Select, DatePicker, Checkbox} from "antd";
import { TagsInput } from "react-tag-input-component";
import { useLocation } from 'react-router-dom';
import {NewDataSchemaApi} from '../request/api';
import moment from 'moment';

const { Option } = Select;

export default function NewDataSchema() {
    //
  
    //获取路由带过来的providerId
    const location = useLocation();

    //获取当前环境各类id(todo)
    const productPkId = 1;
    const productGid = location.state?.productGid;
    const productName = '某产品';
    const {currUserDid, currUserPkId, currUserName} = getCurrAccountInfo();


    //各类状态
    const [tags, setTags] = useState([]);

    //回调
    const onSubmit = (values) => {
        console.log(values);
        var request = {
            dataSchemaName: values.dataSchemaName,
            providerId: currUserPkId,
            providerGId: currUserDid,
            providerName: '张三',
            productId: productPkId,
            productGid: productGid,
            productName: productName,
            tagNames: tags,
            version: values.dataSchemaVersion,
            visible: values.dataSchemaVisible,
            dataSchemaDesc: values.dataSchemaDesc,
            dataSchemaUsage: values.dataSchemaUsage,
            price: values.price,
            createTime: moment().valueOf(),
            dataFormat: values.dataSchemaFormat,
            dataProtocol: values.dataSchemaProtocol,
            accessCondition: values.dataSchemaAccessCondition,
            uri: values.dataSchemaUrl,
            effectTime: values.dataSchemaTimeRange[0].valueOf(),
            expireTime: values.dataSchemaTimeRange[1].valueOf()
        }
        console.log(request);
        // NewDataSchemaApi()
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        message.error("表单提交错误:");
      };
    //
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
                    <div className="brain-form-page-title" >
                        <h1 > 创建数据目录 </h1>
                    </div>
                    <div className="brain-form-page-main">
                        <Form
                        name="create-schema"
                        className="create-schema"
                        // initialValues={{}
                        onFinish={onSubmit}
                        onFinishFailed={onFinishFailed}
                        style={{
                            maxWidth: '600px',
                        }}
                        >
                            <Form.Item
                                name="dataSchemaName"
                                rules={[
                                { required: true, message: "请输入数目目录名称" },
                                { pattern: "^[^ ]+$", message: "名称不能有空格" },
                                ]}
                            >
                                <Input placeholder="请输入数据目录名称" />
                            </Form.Item>
                            <Form.Item
                                name="dataSchemaDesc"
                                rules={[
                                { required: true, message: "请输入目录描述信息" },
                                { pattern: "^[^ ]+$", message: "密码不能有空格" },
                                ]}
                            >
                                <Input
                                
                                placeholder="请输入目录描述信息"
                                />
                            </Form.Item>
                            <Form.Item 
                            name='dataSchemaVisible'                                 
                            >
                                <Select placeholder='数据可见性'>
                                    <Option value="1">数据公开可见</Option>
                                    <Option value="0">仅对我可见</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name='dataSchemaVersion' 
                                defaultValue={0}
                                rules={[
                                    { required: true, message: "请输入目录版本号" },
                                    ]}
                                >
                                <Input placeholder="请输入版本号" />
                            </Form.Item>
                            <Form.Item name="dataSchemaTags">
                                <TagsInput
                                    value={tags}
                                    onChange={setTags}
                                    separators = {[" "]}
                                    placeHolder="输入标签，空格作为分割"
                                />
                            </Form.Item>
                            <Form.Item name='dataSchemaUsage'>
                                <Input placeholder="请输入数据用途" bordered={true} />
                            </Form.Item>
                            <Form.Item name='dataSchemaPrice'>
                                <Input placeholder="请输入价格" bordered={true} />
                            </Form.Item>
                            <Form.Item name='dataSchemaUrl'>
                                <Input placeholder="请输入数据访问Url" bordered={true} />
                            </Form.Item>

                            <Form.Item name='dataSchemaProtocol'>
                                <Select placeholder='数据传输协议'>
                                    <Option value="http">HTTP</Option>
                                    <Option value="https">HTTPS</Option>
                                    <Option value="sftp">SFTP</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name='dataSchemaFormat'>
                                <Input placeholder="请输入数据内容格式" bordered={true} />
                            </Form.Item>
                            <Form.Item name='dataSchemaAccessCondition'>
                                <Input placeholder="请输入查询条件" bordered={true} />
                            </Form.Item>
                        
                            <Form.Item name='dataSchemaTimeRange' >
                                <DatePicker.RangePicker 
                                placeholder={['生效日期', '结束日期']}/>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{ height: "40PX", borderRadius: "12PX"}}
                                >
                                创建目录
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

  function verifyTag(tagName) {
    if (!tagName){
        return {success: false, msg: '不可以为空'};
    }
    return {success: true, msg: ''};
  }