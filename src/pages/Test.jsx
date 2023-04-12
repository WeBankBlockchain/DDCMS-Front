import { Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

export default function Test() {
  
  return (
    <div style={{

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems:'center',
      height: '100vh'
    }}>
        <div style={{
          width: '100vw',
          border: '1px solid red'
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
