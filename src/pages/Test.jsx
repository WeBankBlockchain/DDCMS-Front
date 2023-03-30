import { Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

export default function Test() {
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    if (isStarred) {
      // setTimeout(() => {
      //   setIsStarred(false);
      // }, 1000);
    }
  }, [isStarred]);

  const st = () => {
    const handleClick = () => {
      setIsStarred(false);
      console.log(isStarred);
    };
    const handleUnClick = () => {
      setIsStarred(true);
      console.log(isStarred);
    };

    if (isStarred) {
      return (
        <Button onClick={handleClick}>
          <StarFilled />
          Star
        </Button>
      );
    } else {
      return (
        <Button onClick={handleUnClick}>
          <StarOutlined />
          Star
        </Button>
      );
    }
  };

  return <div>{st()}</div>;
}
