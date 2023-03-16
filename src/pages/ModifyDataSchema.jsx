import { Content, Footer, Header } from 'antd/es/layout/layout';
import React,{useState, useEffect, useRef} from 'react';
import { Form, Input, Button, Layout, message, Select, DatePicker, Meta, Card, Row, Col, Divider} from "antd";
import { TagsInput } from "react-tag-input-component";
import {QueryDataSchemaApi, QueryDataSchemaAccessInfoApi} from '../request/api';
import { useLocation } from 'react-router-dom';
import {NewDataSchemaApi} from '../request/api';
import moment from 'moment';

const { Option } = Select;

export default function ModifyDataSchema() {
  
    //获取路由带过来的providerId
    const location = useLocation();

    //获取当前环境各类id(todo)
    const productPkId = 1;
    const productGid = location.state?.productGid;
    const productName = '某产品';
    const {currUserDid, currUserPkId, currUserName} = getCurrAccountInfo();

    const {schemaId, schemaGid} = loadSchemaIdFromLocation();
    //各类状态
    const [dataSchema, setDataSchema] = useState({});
    const [currDataSchemaAccessInfo, setCurrDataSchemaAccessInfo] = useState({});
    const [initialFormValues, setInitialFormValues] = useState({});
    const [trigger, setTrigger] = useState(1);
    
    const [tags, setTags] = useState([]);
    
    //回调
    
    useEffect(()=>{
        const request = {
            schemaGid: schemaGid
        }
        QueryDataSchemaApi(request).then(res=>{
            if (res.code === 0){
                const tmpDataSchema = res.data;
                setDataSchema(tmpDataSchema);
                setTags(tmpDataSchema.tagNameList);
                const accessInfoRequest = {
                    accessId: res.data.accessId
                };
                QueryDataSchemaAccessInfoApi(accessInfoRequest).then(res=>{
                    if (res.code === 0){
                        const tmpAccessInfo = res.data;
                        setCurrDataSchemaAccessInfo(tmpAccessInfo);
                        const tmpInitValues = getInitialFormValues(tmpDataSchema, tmpAccessInfo);
                        setInitialFormValues(tmpInitValues);

                    } else{
                        message.error(res.msg);
                    }
                });
            } else{
                message.error(res.msg);
            }
        });

    }, []);

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
        // UpdateDataSchemaApi()
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        message.error("表单提交错误:");
      };

    const layout = {
        //labelCol: { span: 24 }, // Use the full width of the form item for the label
        // wrapperCol: { span: 24 }, // Use the full width of the form item for the input
      };

    return (
        initialFormValues.dataSchemaName &&
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
                        <h1 > 修改数据目录</h1>
                    </div>
                    <div className="brain-form-page-main" {...layout} style={{
                        width: '100%'
                    }}>
                        <Form
                        name="create-schema"
                        className="create-schema"
                        initialValues={initialFormValues}
                        onFinish={onSubmit}
                        onFinishFailed={onFinishFailed}
                        style={{
                            maxWidth: '600px',
                        }}
                        {...layout}
                        >
                            <Card title='基本信息' headStyle={{ textAlign: 'left', fontSize:'25px' }}>
                            <Form.Item
                                    label="名称"
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
                                        label="描述"
                                        rules={[
                                        { required: true, message: "请输入目录描述信息" },
                                        { pattern: "^[^ ]+$", message: "密码不能有空格" },
                                        ]}
                                        >
                                            <Input.TextArea
                                        
                                            placeholder="请输入目录描述信息，不超过500字"
                                            />
                                    </Form.Item>
                                    <Row gutter={18}>
                                        <Col span={12}>
                                            <Form.Item 
                                            label='数据是否可见'
                                            name='dataSchemaVisible' 
                                            required                                
                                        >
                                            <Select placeholder='数据可见性' >
                                                <Option value="1">数据公开可见</Option>
                                                <Option value="0">仅对我可见</Option>
                                            </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name='dataSchemaVersion' 
                                        label='版本号'
                                        defaultValue={0}
                                        required
                                        rules={[
                                            { required: true, message: "请输入目录版本号" },
                                            ]}
                                        >
                                                <Input placeholder="请输入版本号" />
                                            </Form.Item>
                                        </Col>
                                    </Row>  


                                    <Form.Item name="dataSchemaTags" label='标签' >
                                        <TagsInput
                                            value={tags}
                                            onChange={setTags}
                                            separators = {[" "]}
                                            placeHolder="输入标签，空格作为分割"
                                        />
                                    </Form.Item>
                                    <Form.Item name='dataSchemaUsage' label='数据用途' required>
                                        <Input.TextArea placeholder="请输入数据用途,不得超过500字" bordered={true} />
                                    </Form.Item>
                

                            
                                    <Form.Item label='价格(rmb/条)' name='dataSchemaPrice' required>
                                        <Input placeholder="请输入价格,例如300.00" bordered={true} />
                                    </Form.Item>
                            </Card>
                            <Divider></Divider>
                            <Card title='数据传输信息'  headStyle={{ textAlign: 'left', fontSize:'25px'}}>
                                <Row gutter={18}>
                                        <Col span={12}>
                                            <Form.Item label='数据传输协议' name='dataSchemaProtocol' required>
                                            <Select placeholder='数据传输协议'>
                                                <Option value="0">HTTP</Option>
                                                <Option value="1">HTTPS</Option>
                                                <Option value="2">SFTP</Option>
                                            </Select>
                                        </Form.Item>
                                        </Col>
                                        <Col span={12}>
  
                                            <Form.Item label='数据格式' name='dataSchemaFormat' required>
                                                <Select placeholder='请输入数据内容格式'>
                                                    <Option value="0">JSON</Option>
                                                    <Option value="1">XML</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>  
                                    <Form.Item label='数据url' name='dataSchemaUrl' required>
                                        <Input placeholder="请输入数据访问Url" bordered={true} />
                                    </Form.Item>
                                    <Form.Item label='查询条件' name='dataSchemaAccessCondition' required >
                                        <Input.TextArea placeholder="请输入查询条件,格式为json" style={{height: 200}}bordered={true} />
                                    </Form.Item>
                            
                                    <Form.Item label='有效日期' name='dataSchemaTimeRange' required>
                                        <DatePicker.RangePicker 
                                    placeholder={['生效日期', '结束日期']}/>
                                    </Form.Item>
                            </Card>


                                                
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

  
  function getCurrAccountInfo() {
    //TODO
    return {currUserDid: "111", currUserPkId: 1, currUserName: '阿里'}
  }

  function loadSchemaIdFromLocation(location) {
    // const schemaId = location.state?.dataSchemaId;
  return {
    schemaId: 1,
    schemaGid: 'AAAQGayMdnmwj5IbY/O5ZaN/wdCoB8BcEbeT2CwCpHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAd=='
  }

}


function getInitialFormValues(dataSchema, dataSchemaAccessInfo) {
    const accessJsonObject = JSON.parse(dataSchemaAccessInfo.accessCondition);
    const wellformattedAccessCondition = JSON.stringify(accessJsonObject, null, 2);
    return {
        dataSchemaName: dataSchema.dataSchemaName,
        dataSchemaDesc: dataSchema.dataSchemaDesc,
        dataSchemaVisible: '' + dataSchema.visible,//otherewise it will display only a "1"
        dataSchemaVersion: dataSchema.version,
        dataSchemaTags: dataSchema.tagNameList,
        dataSchemaUsage: dataSchema.dataSchemaUsage,
        dataSchemaPrice: dataSchema.price.toFixed(2),
        
        dataSchemaProtocol: '' + dataSchemaAccessInfo.dataProtocol,
        dataSchemaFormat: '' + dataSchemaAccessInfo.dataFormat,
        dataSchemaUrl: dataSchemaAccessInfo.uri,
        dataSchemaAccessCondition: wellformattedAccessCondition,
        dataSchemaTimeRange: [moment(dataSchemaAccessInfo.effectTime), moment(dataSchemaAccessInfo.expireTime)]
    }
  }