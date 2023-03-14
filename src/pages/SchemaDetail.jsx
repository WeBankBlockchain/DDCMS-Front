import React, { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import {QueryDataSchemeDetailApi} from '../request/api';

export default function SchemaDetail() {

  //获取路由带过来的schemaId
  const location = useLocation();
  // const schemaId = location.state?.dataSchemaId;

  const schemaId = 10;
  
  
  
  QueryDataSchemeDetailApi({
    schemaGid: schemaId
  }).then(res=>{
    if (res.code === 0){
      console.log(res.data);
    }

  })    
  

  return (
    

    <div>SchemaDetailsss</div>
    
  )
}
