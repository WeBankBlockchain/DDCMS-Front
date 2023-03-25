import "../../assets/HomeHeader.css";
import NotLoginUser from './NotLoginUser';
import LoginUser from './LoginUser';
import {Button} from 'antd'
import { useNavigate } from 'react-router-dom';
import PubSub from 'pubsub-js'
import { APP_BREAD_CRUMB } from '../../constants/KeyConstants';

export default function HomeHeader() {

  const userOperation = localStorage.getItem('userName') !== null?<LoginUser/>:<NotLoginUser/>

  const navigate = useNavigate()
  const onClick = () => {
    PubSub.publish(APP_BREAD_CRUMB, ['最新', '数据目录']);
    navigate('/home', {
      state: {homeFlag: 1}
    })
  }

  return (
    <header>
      <div className="header-content">
        <div
          className="logo"
          style={{
            float: "left",
            color: "#FFF",
          }}
        >
          <Button 
            type='link'
            style={{color: '#FFF', fontSize: '35px', fontWeight: 800, padding: '0 0'}}
            onClick={() => {onClick()}}
          >
            Data Brain
          </Button>
        </div>
        {userOperation}
      </div>
    </header>
  );
}
