import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import {baseURL} from "../request/service.js";

const uploadFile = (file) => {
  // create a FormData object
  const formData = new FormData();
  // append the file to the formData
  formData.append('file', file);
  // append other data to the formData
  formData.append('name', 'test');
  return formData;
};

const url = baseURL + 'file/upload';

const props = {
  name: 'file',
  action: url,
  data: {uploadFile},
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const App = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);
export default App;