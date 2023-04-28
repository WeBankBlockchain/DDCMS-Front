import "../../assets/HomeHeader.css";
import NotLoginUser from './NotLoginUser';
import LoginUser from './LoginUser';
import {Button} from 'antd'
import { useNavigate } from 'react-router-dom';

export default function HomeHeader({userOperation}) {


  const navigate = useNavigate()
  const onClick = () => {
    navigate('/home', {
      state: {
        homeFlag: 1,
        breadcrumb: ['最新', '数据目录']
      }
    })
  }

  return (
    <header>
      <div className="hh-content">
        <div
          className="header-logo"
          style={{
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
        <nav className="header-operation" >
          {userOperation}
        </nav>

      </div>
    </header>
  );
}
