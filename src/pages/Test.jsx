import { Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

export default function Test() {
  
  return (
    <div style={{
      border: '1px solid black',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems:'center',
      height: '600px'
    }}>
      <div style={{
        backgroundColor: 'yellow',
        width: '100px',
        height: '100px',
      }}></div>
      <div style={{
        backgroundColor: 'green',
        width: '100px',
        height: '100px',
        flexGrow: 1
      }}></div>
      <div style={{
        backgroundColor: 'orange',
        width: '100px',
        height: '100px',
      }}></div>
    </div>
  )
    

}

// export default function Test() {
//   const [isStarred, setIsStarred] = useState(false);

//   useEffect(() => {
//     if (isStarred) {
//       // setTimeout(() => {
//       //   setIsStarred(false);
//       // }, 1000);
//     }
//   }, [isStarred]);

//   const st = () => {
//     const handleClick = () => {
//       setIsStarred(false);
//       console.log(isStarred);
//     };
//     const handleUnClick = () => {
//       setIsStarred(true);
//       console.log(isStarred);
//     };

//     if (isStarred) {
//       return (
//         <Button onClick={handleClick}>
//           <StarFilled />
//         </Button>
//       );
//     } else {
//       return (
//         <Button onClick={handleUnClick}>
//           <StarOutlined />
//         </Button>
//       );
//     }
//   };

//   return <div>{st()}</div>;
// }
