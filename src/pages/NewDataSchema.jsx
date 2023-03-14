import React from 'react'

import { useLocation } from 'react-router-dom';
import {NewDataSchemaApi} from '../request/api';

export default function NewDataSchema() {
    
  
    //获取路由带过来的providerId
    const location = useLocation();
    
    
    return (
      <Layout className="layout">
        <HomeHeader></HomeHeader>
        <CommonFooter></CommonFooter>
      </Layout>
    )
  }
  