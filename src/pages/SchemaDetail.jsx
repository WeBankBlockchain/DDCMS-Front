import React, { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

export default function SchemaDetail() {

  //获取路由带过来的schemaId
  const location = useLocation()
  console.log('schemaId:' + location.state.schemaId)

  return (
    <div>SchemaDetail</div>
  )
}
